/**
 * Links the path `/image_uploader` to a route named `image_uploader`. Named like this, a
 * route with the same name needs to be created in the `routes` directory.
 */
// export default {
//   resource: 'user',
//   map() {
//     this.route('evidence_uploader');
//   }
// };

export default {
  resource: 'user.preferences',
  map() {
    this.route('evidence_uploader', {path: '/evidence_uploader', resetNamespace: true});
  }
};

// export default function () {
//   this.route('evidence_uploader', {path: '/u/:user_name/preferences/certificate_uploader'});
// }
