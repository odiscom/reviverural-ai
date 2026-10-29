import React, {useEffect,useState} from 'react';
export default function MunicipalOpportunityHunter(){
 const [data,setData]=useState({status:'loading',opportunities:[],sources:[]});
 const [q,setQ]=useState(''); const [texas,setTexas]=useState(false);
 const load=()=>{setData(d=>({...d,status:'loading'}));fetch('/api/opportunities').then(async r=>{const v=await r.json();setData(v)}).catch(()=>setData({status:'source_error',opportunities:[],sources:[],warning:'Unable to reach the opportunity search service. No verified opportunities.'}))};
 useEffect(load,[]);
 const list=(data.opportunities||[]).filter(x=>(!texas||x.state==='TX')&&(x.title+' '+x.agency+' '+x.solicitationNumber).toLowerCase().includes(q.toLowerCase()));
 return <section style={{display:'grid',gap:20}}>
  <header><h1 className="title-xl">Mowing Opportunity Finder</h1><p className="subtitle">Source-linked federal opportunities. Texas municipal and local bids require source verification before qualification.</p></header>
  <div className="glass-card" style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center'}}>
   <input className="input-field" style={{flex:1,minWidth:220}} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search mowing, agency or solicitation"/>
   <label><input type="checkbox" checked={texas} onChange={e=>setTexas(e.target.checked)}/> Texas only</label>
   <button type="button" className="btn btn-gold" onClick={load}>Refresh search</button>
  </div>
  <p role="status">Feed: <strong>{data.status}</strong>{data.refreshedAt?' | Retrieved '+new Date(data.refreshedAt).toLocaleString():''}. {data.warning}</p>
  {data.status==='loading'?<p>Loading federal search...</p>:null}
  {data.status!=='loading'&&list.length===0?<div className="glass-card">No verified matching opportunities are available from this feed. Do not treat this as evidence that no bids exist.</div>:null}
  <div className="grid-2">{list.map(x=><article className="glass-card" key={x.id}>
   <h2 className="title-md">{x.title}</h2><p>{x.agency}</p><p>Location: {x.state} | Deadline: {x.deadline}</p>
   <p>Solicitation: {x.solicitationNumber}</p><p>Value: Not confirmed | {x.status}</p>
   <a href={x.url} target="_blank" rel="noopener noreferrer">Review official SAM.gov notice</a>
  </article>)}</div>
  <div className="glass-card"><h2 className="title-md">Additional official procurement sources</h2><p className="subtitle">Manual review until verified automated integrations are added.</p>
   {(data.sources||[]).map(x=><p key={x.url}><a href={x.url} target="_blank" rel="noopener noreferrer">{x.name}</a></p>)}
  </div>
 </section>
}
