require 'aws-sdk-dynamodb'
require 'aws-sdk-s3'
require 'time'
AWS_REGION = 'ap-northeast-1'

class EvidencesController < ApplicationController

  def update
    Rails.logger.info 'Called EvidencesController#update'
    Rails.logger.info params

    dynamodb = Aws::DynamoDB::Client.new(
      access_key_id: ENV['ACCESS_KEY_ID'],
      secret_access_key: ENV['SECRET_ACCESS_KEY'],
      region: AWS_REGION
    )
    s3 = Aws::S3::Client.new(
      access_key_id: ENV['ACCESS_KEY_ID'],
      secret_access_key: ENV['SECRET_ACCESS_KEY'],
      region: AWS_REGION
    )

    item = {
      ID: params['id'],
      User: current_user.username,
      UserID: current_user.id,
      Company: params['company_name'],
      Matching: params['matching'],
      Status: 10,
      UpdateTime: Time.now.strftime("%Y-%m-%d %H:%M:%S")
    }
    data = {
      table_name: 'Evidence',
      item: item

    }

    begin
      dynamodb.put_item(data)
    rescue Aws::DynamoDB::Errors::ServiceError => error
      Rails.logger.info 'Unable to add evidence:'
      Rails.logger.info error.message
    end

    begin
      upload_file = params['evidence']

      begin
        s3.put_object(bucket: 'company-evidence', key: params['id'], body: upload_file.read)
      rescue Aws::S3::Errors::ServiceError => error
        Rails.logger.info 'Unable to add evidence-image:'
        Rails.logger.info error.message
        return render status: 500, json: { status: 500, message: "Image Error" }
      end
    rescue => e
      return render status: 200, json: { status: 200, message: "No Image" }
    end

    render json: { evidence: current_user }
  end
end
