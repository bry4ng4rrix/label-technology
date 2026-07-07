import BlogForm from "../BlogForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Nouvel article</h1>
      <div className="mt-6">
        <BlogForm action={createBlogPost} submitLabel="Créer l'article" />
      </div>
    </div>
  );
}
