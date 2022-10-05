import '$lib/db';
import { auth } from '@supabase/auth-helpers-sveltekit/server';

/**
 * Can parse multiple handlers to the sequence function
 */
export const handle = auth();
