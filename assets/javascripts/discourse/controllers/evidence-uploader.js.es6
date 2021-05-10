export default Ember.Controller.extend({
  actions: {
    upload_evidence: function (event) {
      const ember_controller = this;
      let form_data = new FormData($('#evidence_form').get(0))
      form_data.append('id', Date.now())
      $.ajax({
        url: "/evidences",
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false
      })
        .done(function (data, textStatus, jqXHR) {
          $('#state').html('審査申請が完了しました。');
          ember_controller.set('isRegistered', true)
          ember_controller.init();
          return 'success'
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          $('#state').html('審査申請にエラーがありました。画像が大きすぎないか等、不備を確認してください。10MB以下なら通るはずです。<br>不備が無いのにエラーが継続的に発生する場合は<a href="https://discourse.f-syukatu-community.com/u/programmer-d/summary">技術担当者</a>までご連絡ください。')
          return 'fail'
        })
    }

  },
  init: function () {
    this._super();
    let ember_controller = this;
    // let id = '';
    // let company_name = '';
    const registered_data = $.ajax({
      url: "/evidence_check",
      type: "POST"
    })
      .done(function (data, textStatus, jqXHR) {
        ember_controller.set('isRegistered', true);
        ember_controller.set('id', data.data.id);
        ember_controller.set('company_name', data.data.company_name);
        ember_controller.set('matching', data.data.matching === 'accept');
        let state = '';
        if (data.data.state == 10) {
          state = '審査中'
        } else if (data.data.state == 11) {
          state = '承認済み'
        } else {
          state = '保留'
        }
        ember_controller.set('state', state)
        return true
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        ember_controller.set('isRegistered', false);
        return false
      })
  },

});
