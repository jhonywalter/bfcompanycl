export interface ContentSection {
  id: string;
  section_name: string;
  title: string;
  subtitle?: string;
  content: string;
  image_url?: string;
  button_text?: string;
  button_url?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}