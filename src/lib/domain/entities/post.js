export default class Post {
  id;
  title;
  slug;
  description;
  content;
  featuredImages;
  status;
  publishedAt;
  createdAt;
  updatedAt;

  constructor(_data) {
    this.id = _data.id;
    this.title = _data.title;
    this.slug = _data.slug;
    this.description = _data.description;
    this.content = _data.content;
    this.featuredImages = _data.featuredImages;
    this.status = _data.status;
    this.publishedAt = _data.publishedAt;
    this.createdAt = _data.createdAt;
    this.updatedAt = _data.updatedAt;
  }

  get thumbnailUrl() {
    return this.featuredImages ? this.featuredImages["128"] : null;
  }

  get url() {
    return `/posts/${this.slug}`;
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
      featuredImages: json.featured_images,
      status: json.status,
      publishedAt: json.published_at,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
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
      featured_images: this.featuredImages,
      status: this.status,
      published_at: this.publishedAt,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };

    if (stringify) {
      return JSON.stringify(data);
    }

    return data;
  }
}
