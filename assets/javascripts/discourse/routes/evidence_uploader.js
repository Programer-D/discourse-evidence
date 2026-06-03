import DiscourseRoute from "discourse/routes/discourse";

/**
 * Route for the path `/evidence_uploader` as defined in
 * `../evidence_uploader-route-map.js`. The matching template
 * `../templates/evidence_uploader.hbs` is rendered automatically by name,
 * so no explicit `renderTemplate` is required (it was removed from modern Ember).
 */
export default class EvidenceUploaderRoute extends DiscourseRoute {}
