import React, { useState } from 'react';
import { Upload, Icon, message } from 'antd';

import { $axios } from '@/utils/interceptor';
import useMount from '@/hooks/useMount';

const ImageUpload = (imageUrl) => {
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  // useMount(()=>{
  //   $axios
  // })

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    setLoading(true);
    $axios.get();
  }

  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      className="avatar-uploader"
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default ImageUpload;
