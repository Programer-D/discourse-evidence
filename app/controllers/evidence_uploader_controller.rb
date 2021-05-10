class EvidenceUploaderController < ApplicationController
  def index
  end

  def check
    dynamodb = Aws::DynamoDB::Client.new(
      access_key_id: ENV['ACCESS_KEY_ID'],
      secret_access_key: ENV['SECRET_ACCESS_KEY'],
      region: AWS_REGION
    )

    query_condition = {
      table_name: "Evidence",
      key_condition_expression: '#id=:id',
      expression_attribute_names: {
        '#id' => 'UserID'
      },
      expression_attribute_values: {
        ':id' => current_user.id,
      }
    }
    result = dynamodb.query(query_condition)
    if result.count != 0
      data = result.items[0]
      render status: 200, json: { status: 200, data: { id: data['ID'], company_name: data['Company'], matching: data['Matching'],state:data['Status'] ,flag: true } }
    else
      render status: 500, json: { status: 500, data: { flag: false } }
    end


  end
end
