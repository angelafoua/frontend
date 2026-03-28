// components/PostCard.js
export default function PostCard({ post }) {
  const authorName = post.author ? post.author.full_name : 'Page';
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="flex items-center space-x-2 mb-2">
        {post.author?.avatar_url && <img src={post.author.avatar_url} className="w-8 h-8 rounded-full"/>}
        <span className="font-bold">{authorName}</span>
      </div>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} className="mt-2 rounded"/>}
      <div className="flex mt-2 space-x-4 text-sm text-gray-500">
        <span>Like</span>
        <span>Comment</span>
      </div>
    </div>
  );
}
