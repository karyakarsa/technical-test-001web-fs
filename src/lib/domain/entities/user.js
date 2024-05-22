export default class User {
  id;
  email;
  createdAt;
  lastSignInAt;

  constructor(_data) {
    this.id = _data.id;
    this.email = _data.email;
    this.createdAt = _data.createdAt;
    this.lastSignInAt = _data.lastSignInAt;
  }

  static fromJson(json) {
    return new User({
      id: json.id,
      email: json.email,
      createdAt: json.created_at,
      lastSignInAt: json.last_sign_in_at,
    });
  }
}
