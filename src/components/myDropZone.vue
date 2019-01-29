<template>

        <div class="dropzone-wrap" v-if="this.visible">
            <div class="dropzone-overlay" @click="delDZ"></div>
            <div class="dropzone-content">
                <div class="dropzone-information">
                    <div class="information__block">
                        <div class="information__icon information__icon_add"></div>
                        <div class="information__content">
                            <div class="information__title">Загрузите работу</div>
                            <div class="information__text">Выберите удобный Вам формат и загрузите решённое задание
                            </div>
                        </div>
                    </div>
                    <div class="information__block">
                        <div class="information__icon information__icon_checkOut"></div>
                        <div class="information__content">
                            <div class="information__title">Проверка работы</div>
                            <div class="information__text">
                                Пока преподаватель изучает вашу работу, у урока будет стоять статус «проверяется»
                            </div>
                        </div>
                    </div>
                    <div class="information__block">
                        <div class="information__icon information__icon_edit"></div>
                        <div class="information__content">
                            <div class="information__title">Разбор задания</div>
                            <div class="information__text">
                                Если урок предполагает проверку, вы сможете скачать разбор задания
                            </div>
                        </div>

                    </div>
                </div>
                <div class="dropzone-my">
                    <div class="dropzone-my__title">Загрузить домашнюю работу</div>
                    <vue-dropzone
                            ref="myVueDropzone"
                            id="dropzone"
                            :options="dropzoneOptions"
                            @vdropzone-success="DropZoneSuccess"
                    >
                        >
                    </vue-dropzone>
                    <div class="dropzone-controls">
                        <span class="removeFile"
                              @click="deleteFiles"
                        > Отмена</span>
                        <button class="getFile"
                                :disabled = "this.dis"
                                @click="getAcceptedFiles">Отправить</button>
                    </div>

                </div>

            </div>

        </div>

</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'testDropzone',
  components: {
    'vue-dropzone': vue2Dropzone
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dropzoneOptions: {
        url: 'http://lk-test.school-olymp.com/app/ajax/addHomeworkFile.php',
        autoProcessQueue: true,
        thumbnailWidth: 150,
        maxFilesize: 5,
        createImageThumbnails: false,
        maxFiles: 1,
        acceptedFiles: 'image/*,application/pdf,.psd,application/docx,application/doc,.zip,.rar',
        addRemoveLinks: true,
        chunking: true,
        parallelChunkUploads: true,
        dictDefaultMessage:
          '  <img src="http://lk-test.school-olymp.com/img/cloud.svg" class="dropzone-my__icon" alt=""> Загрузите решённое домашнее задание в формате word, png, jpg или pdf (размер до 5 мб)',
        dictFileTooBig: 'файл слишком большой',
        dictInvalidFileType: 'неизвестный формат файла',
        dictCancelUpload: 'удалить файл',
        dictUploadCanceled: 'удалить файл',
        dictCancelUploadConfirmation:
          'Вы действительно хотите прервать загрузку файла?'
      },
      resp: '',
      dis: true
    }
  },
  methods: {
    DropZoneSuccess: function (file, response) {
      this.resp = response
      this.dis = false
      console.log(response)
    },
    deleteFiles () {
      this.$refs.myVueDropzone.removeAllFiles(true)
      this.resp = null
      this.dis = true
    },
    getAcceptedFiles () {
      this.$emit('getFiles', this.resp)
    },
    delDZ () {
      this.$emit('delDZ', this.$refs.myVueDropzone)
    }
  }
}
</script>
<style lang="scss">
@import "../globalStyles/variables";

.vue-dropzone {
  width: 565px;
  height: 389px;
  border-image: url("../assets/bor.png") 1 round;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
}

.dropzone .dz-preview.dz-error {
  display: none;
}

.dropzone .dz-message {
  font-family: $basic;
  font-size: 16px;
  line-height: 23px;
  width: 330px;
}

.dropzone-my__icon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 35px;
}

.dropzone .dz-preview .dz-progress {
  opacity: 1 !important;
  bottom: 30px;
  top: auto;
  margin: 0 auto;
  transform: translateX(-50%);
  height: 4px;
  width: 136px;
  background-color: #eaeaeb;
  overflow: visible;
  &:after {
    content: "Загрузка...";
    display: block;
    position: absolute;
    top: -29px;
    left: 50%;
    transform: translateX(-50%);
    font-family: $basic;
    font-size: 13px;
    color: #c7cdd6;
    opacity: 1;
    transition: 0.5s ease-in-out;
  }
  .dz-upload {
    background-color: #b1cd43;
    border-radius: 10px;
  }
}
.dropzone .dz-preview .dz-details .dz-size,
.dz-filename {
  display: none;
}
.dropzone-my .dropzone .dz-preview {
  background: #ffffff;
  border: 1px solid #eff2f7;
  box-shadow: 0 1px 2px 0 #eff1f3;
  border-radius: 4px;
  width: 194px;
  height: 217px;
  .dz-image {
    background: none;
    border-radius: 0;
    img {
      display: none;
    }
  }
}

.vue-dropzone .dz-preview .dz-remove {
  color: transparent;
  background: transparent url("../assets/deleteFile.svg") no-repeat center
    center;
  background-size: contain;
  opacity: 0 !important;
}

.vue-dropzone .dz-preview .dz-details {
  background: transparent url("../assets/file.svg") no-repeat center 41%;
  background-size: 29%;
  color: #000000;
}

.dropzone-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-family: $basic;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s ease;
}
.dropzone-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.47);
  z-index: 1;
}

.dropzone-content {
  width: 1018px;
  height: 605px;
  background: #ffffff;
  box-shadow: 0 4px 29px 0 rgba(0, 0, 0, 0.11);
  border-radius: 4px;
  display: flex;
  max-width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  transform-origin: center center;
  z-index: 2;
  transition: all 0.3s ease;
}
.dz-preview.dz-file-preview.dz-processing.dz-success.dz-complete {
  .dz-progress:after {
    opacity: 0;
  }
  .dz-details {
    background: transparent url("../assets/fileD.svg") no-repeat center 41%;
  }
  .dz-remove {
    opacity: 1 !important;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0;
    border: none;
  }
}
.dropzone-information {
  width: 313px;
  border-right: 1px solid #ecedef;
  padding: 111px 32px;
  max-width: 100%;
}

.information__block {
  margin-bottom: 40px;
  display: flex;
}

.information__title {
  font-family: $bold;
  font-size: 15px;
  color: #000000;
  line-height: 21px;
  margin-bottom: 12px;
}

.information__text {
  font-family: $basic;
  font-size: 14px;
  color: #5f5f5f;
  line-height: 20px;
}

.information__icon {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background-color: #f1fec1;
  min-width: 43px;
  margin-right: 20px;
  &_add {
    background: #f1fec1 url("../assets/downloadHW.svg") no-repeat center center;
    background-size: 50%;
  }
  &_checkOut {
    background: #edf5fa url("../assets/checkoutHW.svg") no-repeat center center;
    background-size: 44%;
  }
  &_edit {
    background: #ffd99a url("../assets/editHW.svg") no-repeat center center;
    background-size: 44%;
  }
}

.dropzone-my {
  padding: 50px 76px 34px 76px;
}

.dropzone-my__title {
  font-family: $bold;
  font-size: 22px;
  color: #2e2e2e;
  line-height: 29px;
  text-align: center;
  margin-bottom: 34px;
}
.dropzone-controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  align-items: center;
}
.getFile {
  display: flex;
  width: 151px;
  height: 43px;
  justify-content: center;
  align-items: center;
  color: #fff;

  margin-left: 0;
  margin-right: 0;
  background-color: #B1CD43;
  border-radius: 3px;
  font-family: $bold;
  font-size: 15px;
  cursor: pointer;
  transition: .4s ease;
  border: none;
  &:hover {
      background-color: #98D930;
  }
  &[disabled] {
    background-color: #e9e9e9;
    cursor: auto;
    &:hover {
      background-color: #e9e9e9;
    }
  }
}
.removeFile {
  display: block;
  font-family: $bold;
  font-size: 15px;
  color: #a8a8a8;
  margin-right: 42px;
  cursor: pointer;
}
.modal-leave-active .dropzone-content {
  transform: scale(1.1) translate(-50%, -50%);
}
</style>
