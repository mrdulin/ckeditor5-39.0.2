ClassicEditor.create(document.querySelector('.editor'), {
  // Editor configuration.
})
  .then((editor) => {
    window.editor = editor;
    CKEditorInspector.attach(editor);
    editor.setData('<p>Hello <mark>world</mark>!</p>');
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
