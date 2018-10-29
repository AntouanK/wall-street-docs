const Handlebars = require("handlebars");

const pageScript = function() {
  $(document).ready(function(e) {
    // reset messages
    $("#error-container").toggle(false);
    $("#success-container").toggle(false);
    $("#uploading-container").toggle(false);

    $("#form-upload-multiple").on("submit", function(e) {
      //  prevent default submit
      e.preventDefault();

      // make ajax call
      $.ajax({
        url: "/upload-files",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function() {
          $("#error-container").toggle(false);
          $("#success-container").toggle(false);
          $("#uploading-container").toggle(true);
        },
        success: function(data) {
          $("#uploading-container").toggle(false);
          $("#success-container").toggle(true);
          $("#form-upload-multiple")[0].reset();
        },
        error: function(e) {
          $("#uploading-container").toggle(false);
          $("#error-container").toggle(true);
          console.log("error");
        }
      });
    });
  });
};

const source = `
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">
    </script>

    <div>
        <h3>Hello</h3>
        <p>Please upload your files.</p>
        <div id="form-container">
            <form
                id="form-upload-multiple"
                action="/upload-files"
                method="post"
                enctype="multipart/form-data"
            >
                <input name="files" type="file" multiple />
                <button type="submit">
                    Upload
                </button>
            </form>
        </div>
        <div id="uploading-container">
            <span>Uploading files...</span>
        </div>
        <div id="success-container" style="color: #0a9a0e;">
            <span>Files successfully uploaded.</span>
        </div>
        <div id="error-container" style="color: #9e0a0a;">
            <span>Something went wrong.</span>
        </div>
        <div id="available-files-container" style="margin: 20px 0;">
            <a href="/available-files">see available files (json)</a>
        </div>
    </div>

    <script type="text/javascript">(${pageScript.toString()})()</script>
`;

//
//  route handler
const handler = (req, res, next) => {
  const template = Handlebars.compile(source);
  const result = template({});
  res.send(result);
  next();
};

module.exports = handler;
