// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:users(id, full_name, avatar_url), business_page_id, association_page_id')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) console.error(error);
    else setPosts(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
