import { formatDate } from "src/lib/common/date";
import { renderedContent } from "src/lib/common/editorjs";

export default class Post {
  id;
  title;
  slug;
  description;
  content;
  protectedContent;
  featuredImages;
  status;
  publishedAt;
  createdAt;
  updatedAt;
  haveProtectedContent;

  constructor(_data) {
    this.id = _data.id;
    this.title = _data.title;
    this.slug = _data.slug;
    this.description = _data.description;
    this.content = _data.content;
    this.protectedContent = _data.protectedContent;
    this.featuredImages = _data.featuredImages;
    this.status = _data.status;
    this.publishedAt = _data.publishedAt;
    this.createdAt = _data.createdAt;
    this.updatedAt = _data.updatedAt;
    this.haveProtectedContent = _data.haveProtectedContent;
  }

  get thumbnailUrl() {
    return this.featuredImages ? this.featuredImages["128"] : null;
  }

  get url() {
    return `/posts/${this.slug}`;
  }

  get postPublishedAt() {
    return this.publishedAt ? formatDate(this.publishedAt) : null;
  }

  get postContent() {
    return `${renderedContent(this.content)}`;
  }

  get postContentProtected() {
    return `${renderedContent(this.protectedContent)}`;
  }

  /**
   * Create Post from Json
   *
   * @usage
   * Post.fromJson({...})
   * @param {*} json
   * @returns Post
   */
  static fromJson(json) {
    return new Post({
      id: json.id,
      title: json.title,
      slug: json.slug,
      description: json.description,
      content: json.content,
      protectedContent: json.protected_posts ? json.protected_posts.content : null,
      featuredImages: json.featured_images,
      status: json.status,
      publishedAt: json.published_at,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
      haveProtectedContent: json.have_protected_content,
    });
  }

  /**
   * Trasform data to json
   * @returns
   */
  toJson(stringify = false) {
    const data = {
      id: this.id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      content: this.content,
      protectedContent: this.protectedContent,
      featured_images: this.featuredImages,
      status: this.status,
      published_at: this.publishedAt,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      haveProtectedContent: this.haveProtectedContent,
    };

    if (stringify) {
      return JSON.stringify(data);
    }

    return data;
  }
}
