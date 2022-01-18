
const actualBtn = document.getElementById('actual-btn');
const fileChosen = document.getElementById('file-chosen');
const fileImage = document.getElementById('file-image');
actualBtn.addEventListener('change', function(){
  fileChosen.value = this.files[0].name;
  fileImage.src = URL.createObjectURL(this.files[0])
})
