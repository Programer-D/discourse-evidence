/**
 * Route for the path `/evidence_uploader` as defined in `../evidence_uploader-route-map.js.es6`.
 */
export default Discourse.Route.extend({
  model() {
    return this.store.findAll('data');
  },
  renderTemplate() {
    this.render('evidence_uploader');
  }
  // afterModel(model) {
  //   this.transitionTo("register")
  // }
});
