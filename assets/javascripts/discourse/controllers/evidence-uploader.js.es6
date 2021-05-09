export default Ember.Controller.extend({
  actions: {
    upload_evidence: function (event) {
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
          return 'success'
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          $('#state').html('審査申請にエラーがありました。画像が設定されていないか等、不備を確認してください。<br>不備が無い場合は<a href="https://discourse.f-syukatu-community.com/u/programmer-d/summary">技術担当者</a>までご連絡ください。')
          return 'fail'
        })
    }
  }
});
