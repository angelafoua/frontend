// pages/profile/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import PostCard from '../../components/PostCard';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    const { data: userData } = await supabase.from('users').select('*').eq('id', id).single();
    setUser(userData);

    const { data: userPosts } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', id)
      .order('created_at', { ascending: false });
    setPosts(userPosts);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center space-x-4 mb-4">
        {user.avatar_url && <img src={user.avatar_url} className="w-16 h-16 rounded-full"/>}
        <div>
          <h1 className="text-2xl font-bold">{user.full_name}</h1>
          <p>{user.bio}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Posts</h2>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
