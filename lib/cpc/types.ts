export type PartnerStatus = "pending" | "active" | "paused";

export type CpcPartner = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  website: string;
  contact_email: string;
  allowed_host: string;
  cpc_ore: number | null;
  status: PartnerStatus;
  auth_user_id: string | null;
  notes: string | null;
};

export type CpcClick = {
  id: string;
  created_at: string;
  partner_id: string;
  placement: string | null;
  target_url: string;
  referer: string | null;
  user_agent: string | null;
};
