export default class PostContentLinkMeta {
  title;
  site_name;
  description;
  image;

  constructor(_data) {
    this.title = _data.title;
    this.site_name = _data.site_name;
    this.description = _data.description;
    this.image = _data.image;
  }

  static fromJson(json) {
    return new PostContentLinkMeta({
      title: json.title,
      site_name: json.site_name,
      description: json.description,
      image: json.image,
    });
  }

  /**
   * Trasform data to json
   * @returns
   */
  toJson(stringify = false) {
    const data = {
      id: this.id,
      type: this.type,
      data: this.data,
    };

    if (stringify) {
      return JSON.stringify(data);
    }

    return data;
  }
}
