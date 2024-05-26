export default class PostBlock {
  id;
  type;
  data;

  constructor(_data) {
    this.id = _data.id;
    this.type = _data.type;
    this.data = _data.data;
  }

  static fromJson(json) {
    return new PostBlock({
      id: json.id,
      type: json.type,
      data: json.data,
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
