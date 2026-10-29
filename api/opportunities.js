// Server-side federal procurement search. Never expose SAM_GOV_API_KEY to browser.
export default async function handler(req,res) {
  if(req.method!=='GET') return res.status(405).json({error:'GET only'});
  res.setHeader('Cache-Control','public, s-maxage=1800');
  const sources=[{name:'SAM.gov',url:'https://sam.gov/content/opportunities'},{name:'Texas ESBD',url:'https://www.txsmartbuy.gov/esbd'},{name:'TxDOT',url:'https://www.txdot.gov/business.html'}];
  if(!process.env.SAM_GOV_API_KEY) return res.status(200).json({status:'setup_required',opportunities:[],sources,warning:'Server SAM_GOV_API_KEY is required; no live bids verified.'});
  const now=new Date(),start=new Date(now.getTime()-120*86400000);
  const date=d=>[String(d.getUTCMonth()+1).padStart(2,'0'),String(d.getUTCDate()).padStart(2,'0'),d.getUTCFullYear()].join('/');
  const q=new URLSearchParams({api_key:process.env.SAM_GOV_API_KEY,postedFrom:date(start),postedTo:date(now),limit:'100',offset:'0',ncode:'561730',ptype:'o,k'});
  try {
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    let result;
    try {result=await fetch('https://api.sam.gov/opportunities/v2/search?'+q,{signal:controller.signal});}
    finally {clearTimeout(timer);}
    if(!result.ok) throw new Error('SAM.gov HTTP '+result.status);
    const json=await result.json();
    if(!Array.isArray(json.opportunitiesData)) throw new Error('Unexpected SAM.gov response');
    const today=now.toISOString().slice(0,10);
    const pattern=/mow|brush|vegetation|landscap|grounds|weed|right.of.way|roadside|tree trim/i;
    const opportunities=json.opportunitiesData.filter(x=>{
      const deadline=String(x.reponseDeadLine||x.responseDeadLine||'').slice(0,10);
      return /^[0-9a-f-]{8,64}$/i.test(String(x.noticeId||'')) && pattern.test(x.title||'') && deadline>=today && x.active!==false && String(x.active).toLowerCase()!=='no';
    }).map(x=>({
      id:x.noticeId,title:x.title,agency:x.fullParentPathName||x.department||'Agency not specified',
      deadline:String(x.reponseDeadLine||x.responseDeadLine).slice(0,10),
      solicitationNumber:x.solicitationNumber||'Not provided',
      state:x.placeOfPerformance?.state?.code||'Not provided',
      url:'https://sam.gov/opp/'+encodeURIComponent(x.noticeId)+'/view',
      source:'SAM.gov',status:'Requires bid qualification',estimatedValue:null
    }));
    return res.status(200).json({status:'live',opportunities:[...new Map(opportunities.map(x=>[x.id,x])).values()],sources,refreshedAt:now.toISOString(),warning:'Federal results only; first 100 recent NAICS 561730 notices. Verify original deadlines and eligibility.'});
  }catch(e) {return res.status(502).json({status:'source_error',opportunities:[],sources,warning:String(e.message||'SAM.gov unavailable')});}
}
