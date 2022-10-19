export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			guest: {
				Row: {
					id: number;
					created_at: string | null;
					name: string;
					photo_url: string | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					name: string;
					photo_url?: string | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					name?: string;
					photo_url?: string | null;
				};
			};
			host: {
				Row: {
					id: number;
					created_at: string | null;
					user: string;
					party: number;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					user: string;
					party: number;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					user?: string;
					party?: number;
				};
			};
			party: {
				Row: {
					id: number;
					room_uuid: string;
					name: string;
					created_at: string | null;
				};
				Insert: {
					id?: number;
					room_uuid?: string;
					name: string;
					created_at?: string | null;
				};
				Update: {
					id?: number;
					room_uuid?: string;
					name?: string;
					created_at?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			create_party: {
				Args: { user_id: string; party_name: string };
				Returns: unknown;
			};
			get_party_entries: {
				Args: { party_uuid: string };
				Returns: number;
			};
			get_user_parties: {
				Args: { user_id: string; return_limit: number };
				Returns: unknown;
			};
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
