import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to notifications page as the primary view
  redirect('/notifications');
}
