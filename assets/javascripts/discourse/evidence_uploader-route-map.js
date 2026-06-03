/**
 * Registers the `evidence_uploader` route under the user preferences resource,
 * mapped to the path `/u/:username/preferences/evidence_uploader`.
 */
export default {
  resource: "user.preferences",

  map() {
    this.route("evidence_uploader", {
      path: "/evidence_uploader",
      resetNamespace: true,
    });
  },
};
