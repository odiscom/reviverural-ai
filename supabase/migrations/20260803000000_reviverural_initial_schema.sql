-- ==============================================================================
-- REVIVE RURAL AI — DDL SCHEMA MIGRATION (FRESH TENANT DB)
-- Project: Revive Rural AI (ai.reviverural.com)
-- Note: DDL Schema ONLY. Zero legacy seed records included.
-- ==============================================================================

-- 1. Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL DEFAULT 'Revive Rural Operations',
    slug TEXT UNIQUE NOT NULL DEFAULT 'revive-rural-main',
    domain TEXT DEFAULT 'reviverural.com'
);

-- Enable RLS on Organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    organization_id UUID REFERENCES public.organizations(id),
    role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member'))
);

-- Enable RLS on Users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile and team"
    ON public.users FOR SELECT
    USING (auth.uid() = id OR organization_id IN (
        SELECT organization_id FROM public.users WHERE id = auth.uid()
    ));

-- 3. Municipal Mowing RFP Bid Analysis Table
CREATE TABLE IF NOT EXISTS public.mowing_bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    created_by UUID REFERENCES public.users(id),
    rfp_title TEXT NOT NULL,
    issuing_agency TEXT NOT NULL, -- e.g. City of Tyler, Jasper County MUD #2
    contract_category TEXT DEFAULT 'Municipal Mowing' CHECK (contract_category IN ('Municipal Mowing', 'Code Enforcement', 'Utility ROW', 'Drainage District', 'Property Cleanup')),
    total_acreage NUMERIC(10,2),
    mowing_frequency TEXT, -- e.g., Weekly, Bi-weekly, Monthly, On-Call
    rfp_document_url TEXT,
    extracted_requirements JSONB,
    pricing_risks JSONB, -- Liquidated damages, steep slopes, hazardous tire zones
    estimated_bid_amount NUMERIC(12,2),
    status TEXT DEFAULT 'Under Review' CHECK (status IN ('Draft', 'Under Review', 'Bid Submitted', 'Awarded', 'Declined'))
);

-- Enable RLS on Mowing Bids
ALTER TABLE public.mowing_bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage mowing bids within their organization"
    ON public.mowing_bids FOR ALL
    USING (organization_id IN (
        SELECT organization_id FROM public.users WHERE id = auth.uid()
    ));

-- 4. Property Condition Assessment Table
CREATE TABLE IF NOT EXISTS public.property_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    assessed_by UUID REFERENCES public.users(id),
    parcel_id TEXT,
    address TEXT NOT NULL,
    assessment_classification TEXT NOT NULL CHECK (assessment_classification IN ('Light Mow', 'Heavy Mow', 'Brush Cleanup', 'Debris Removal', 'Tree Removal')),
    estimated_crew_hours NUMERIC(6,2),
    equipment_recommendations JSONB, -- Zero-turn, Bushhog, Skidsteer, Chainsaw crew
    image_urls TEXT[],
    ai_vision_analysis JSONB,
    risk_rating INTEGER DEFAULT 1 CHECK (risk_rating BETWEEN 1 AND 10)
);

-- Enable RLS on Property Assessments
ALTER TABLE public.property_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage property assessments within their organization"
    ON public.property_assessments FOR ALL
    USING (organization_id IN (
        SELECT organization_id FROM public.users WHERE id = auth.uid()
    ));

-- 5. Municipal Bid Hunter Tracker Table
CREATE TABLE IF NOT EXISTS public.municipal_bids_hunter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('City', 'County', 'MUD', 'Drainage District', 'Utility ROW')),
    entity_name TEXT NOT NULL,
    jurisdiction_state TEXT DEFAULT 'TX',
    contract_name TEXT NOT NULL,
    estimated_value NUMERIC(12,2),
    submission_deadline TIMESTAMP WITH TIME ZONE,
    source_url TEXT,
    tracked_status TEXT DEFAULT 'Active' CHECK (tracked_status IN ('Active', 'Preparing Bid', 'Submitted', 'Archived'))
);

-- Enable RLS on Municipal Bid Hunter
ALTER TABLE public.municipal_bids_hunter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view municipal bid opportunities"
    ON public.municipal_bids_hunter FOR SELECT
    TO authenticated
    USING (true);
