ClassicEditor.create(document.querySelector('.editor'), {
  // Editor configuration.
  lineHeight: {
    options: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.5, 3.5],
  },
  simpleUpload: {
    uploadUrl: 'http://192.168.10.197:5000/upload',
  },
  // wordCount: {
  //   onUpdate: stats => {

  //   }
  // }
})
  .then((editor) => {
    window.editor = editor;
    // editor.setData('<p>Hello <mark>world</mark>!</p>');

    // 调试工具
    CKEditorInspector.attach(editor);


    // 输出HTML用于预览
    const $output = document.getElementById('output-content');
    editor.model.document.on('change:data', () => {
      $output.innerHTML = editor.getData();
    });

    // 字数
    // const wordCountPlugin = editor.plugins.get('WordCount');
    // const wordCountWrapper = document.getElementById('word-count');

    // wordCountWrapper.appendChild(wordCountPlugin.wordCountContainer);
  })
  .catch(handleSampleError);

function handleSampleError(error) {
  const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

  const message = [
    'Oops, something went wrong!',
    `Please, report the following error on ${issueUrl} with the build id "ngeuuwx1gvdj-nohdljl880ze" and the error stack trace:`,
  ].join('\n');

  console.error(message);
  console.error(error);
}
