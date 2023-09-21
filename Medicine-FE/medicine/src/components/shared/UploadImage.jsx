import axios from "axios";
import Dropzone from "react-dropzone";
import "/Medicine-FE/medicine/src/styles/UploadImage.scss";

function Upload({ imageList }) {
  const folder = [];
  const handleUpload = (e) => {
    const uploaders = e.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dweeibvh");
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dwsae4gmt/image/upload",
          formData
        )
        .then((response) => {
          folder.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    axios.all(uploaders).then(() => {
      imageList(folder);
    });

    // axios.all(uploaders).then(() => {

    // })
  };

  return (
    <div className="App">
      <section className="left-side">
        <Dropzone className="dropzone" onDrop={handleUpload}>
          {({ getRootProps, getInputProps }) => {
            return (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <img
                    src="https://res.cloudinary.com/dwsae4gmt/image/upload/v1688977770/oc-browse_orrgiy.svg"
                    width="100px"
                  />

                  <p>Kéo thả hình ảnh của bạn vào đây</p>
                  <p>hoặc</p>
                  <p>Chọn từ thư mục của bạn</p>
                </div>
              </section>
            );
          }}
        </Dropzone>
      </section>
    </div>
  );
}
export default Upload;
