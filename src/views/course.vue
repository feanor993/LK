<template>
    <div class="wrapper">
        <div class="top">
            <header-lk></header-lk>
        </div>
        <div class="content content_user">
            <user-nav></user-nav>
            <main class="main main-course">
                <div class="main-course__banner">
                    <div class="course-content">
                        <div class="teacher-block">
                            <div class="teacher-img"
                                 :style="{backgroundImage: 'url(' + this.teacher.photo + ')' }"
                            ></div>
                            <div class="teacher-name" v-text="teacher.name"></div>
                        </div>
                        <h1 class="course-title" v-text="courseData.name"></h1>

                        <counter-line
                                :total="this.lessonInformation.count"
                                :text="this.text"
                                :now="this.lessonInformation.done"></counter-line>
                    </div>
                </div>
                <div class="course">
                    <div class="course-content" v-if="this.group">
                        <div class="course-group"

                             v-for="(group, index) in this.groups"
                             :key="group.id">
                            <div    class="course-group__title-wrap"
                                    @click="toggleBlock(index)"
                                    :class="{ rotate: !getShow(index)  }"

                            >

                                <div class="course-group__title-number" v-text="index + 1"></div>
                                <div class="course-group__title" v-text="group.name"></div>

                            </div>
                            <transition name="accordion"
                                        v-on:before-enter="beforeEnter" v-on:enter="enter"
                                        v-on:before-leave="beforeLeave" v-on:leave="leave"
                            >
                                <div class="course-group__content"
                                     v-show="getShow(index)"
                                >
                                    <div
                                            v-for="item in group.items"
                                            :key="item.id"
                                            :class="'course-block ' + getBlockClass(item.blocked)">
                                        <div
                                                :class="'course-block__icon' + getIcon(item.blocked, item.result)"
                                        ></div>
                                        <div class="course-block__content">
                                            <div class="course-block__title" v-text="item.name"></div>
                                            <div class="course-block__date">{{setDate(item.date)}}</div>
                                            <div class="course-block__buttons" v-if="setButtons(item.buttons)">
                                                <a
                                                        v-if="item.buttons.task.have"
                                                        :href="item.buttons.task.link"
                                                        class="course-block__button course-block__button_task"
                                                        target="_blank"
                                                >Задание</a>
                                                <a
                                                        v-if="item.buttons.materials.have"
                                                        :href="item.buttons.materials.link"
                                                        class="course-block__button course-block__button_material"
                                                        target="_blank"
                                                >Материалы</a>
                                                <a
                                                        v-if="item.buttons.razbor.have"
                                                        :href="item.buttons.razbor.link"
                                                        class="course-block__button course-block__button_razbor"
                                                        target="_blank"
                                                >Разбор</a>
                                                <div class="course-block__button course-block__button_process"
                                                     v-if="item.buttons.process.have"
                                                >В процессе
                                                </div>
                                                <div class="course-block__button course-block__button_solve"
                                                    v-if="item.buttons.solve.have"
                                                     @click="buildTask(item)"
                                                >Решить задание</div>
                                            </div>
                                        </div>
                                        <div
                                                v-if="item.result"
                                                :class="'course-block__result ' + setCircle(item.result.done, item.result.maximum)"
                                        >{{item.result.done}}
                                        </div>
                                        <div v-else class="course-block__result course-block__result_standart">0</div>
                                    </div>
                                </div>
                            </transition>

                        </div>
                    </div>
                    <div class="course-content course-content_noGroup" v-else>
                        <div
                                v-for="item in this.items"
                                :key="item.id"
                                :class="'course-block ' + getBlockClass(item.blocked)">
                            <div
                                    :class="'course-block__icon' + getIcon(item.blocked, item.result)"
                            ></div>
                            <div class="course-block__content">
                                <div class="course-block__title" v-text="item.name"></div>
                                <div class="course-block__date">{{setDate(item.date)}}</div>
                                <div class="course-block__buttons" v-if="setButtons(item.buttons)">
                                    <a
                                            v-if="item.buttons.task.have"
                                            :href="item.buttons.task.link"
                                            class="course-block__button course-block__button_task"
                                            target="_blank"
                                    >Задание</a>
                                    <a
                                            v-if="item.buttons.materials.have"
                                            :href="item.buttons.materials.link"
                                            class="course-block__button course-block__button_material"
                                            target="_blank"
                                    >Материалы</a>
                                    <a
                                            v-if="item.buttons.razbor.have"
                                            :href="item.buttons.razbor.link"
                                            class="course-block__button course-block__button_razbor"
                                            target="_blank"
                                    >Разбор</a>
                                    <div class="course-block__button course-block__button_process"
                                         v-if="item.buttons.process.have"
                                    >В процессе
                                    </div>
                                    <div class="course-block__button course-block__button_solve"
                                         v-if="item.buttons.solve.have"
                                         @click="buildTask(item)"
                                    >Решить задание</div>
                                </div>
                            </div>
                            <div
                                    v-if="item.result"
                                    :class="'course-block__result ' + setCircle(item.result.done, item.result.maximum)"
                            >{{item.result.done}}
                            </div>
                            <div v-else class="course-block__result course-block__result_standart">0</div>
                        </div>
                    </div>
                </div>
            </main>
            <transition name="modal">
            <dropzone
                :visible="this.dropzoneVis"
                @getFiles="getFiles"
                @delDZ="delDZ"
            ></dropzone>
            </transition>
        </div>
    </div>
</template>
<script>
import headerLK from '@/components/header.vue'
import userNav from '@/components/userNav.vue'
import counter from '@/components/counter.vue'
import gmn from '@/mixins/getMonthName'
import myDropZone from '@/components/myDropZone.vue'
import axios from 'axios'

export default {
  name: 'course',
  components: {
    'header-lk': headerLK,
    'user-nav': userNav,
    'counter-line': counter,
    dropzone: myDropZone
  },
  data () {
    return {
      courseData: {},
      groups: [],
      items: [],
      teacher: {},
      lessonInformation: {},
      text: ' уроков',
      visible: true,
      dropzoneVis: false,
      taskForSending: {},
      group: false
    }
  },
  mounted () {
    axios
      // "http://apois.school-olymp.ru/lk/json/courseDouble.php"
      .get('http://apois.school-olymp.ru/lk/json/course.php', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        this.courseData = response.data.courseData
        this.teacher = response.data.courseData.teacher
        this.lessonInformation = response.data.courseData.lessonInformation
        this.group = response.data.courseData.group
        console.log(response.data.courseData.group)
        if (response.data.courseData.group === true) {
          response.data.grours.forEach(group => (group.show = true))
          this.groups = response.data.grours
        } else {
          this.items = response.data.items
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  },
  methods: {
    getBlockClass (arg) {
      return arg ? 'course-block_blocked' : ''
    },
    setDate (date) {
      let myDate = date.split(' ')[0]
      let myTime = date.split(' ')[1]
      let year = parseInt(myDate.split('.')[2])
      let month = parseInt(myDate.split('.')[1]) - 1
      let day = parseInt(myDate.split('.')[0])
      let hours = myTime.split(':')[0]
      let minutes = myTime.split(':')[1]
      let jsDate = new Date(year, month, day, hours, minutes, 0, 0)
      let dayName = gmn.getWeekDay(jsDate)
      let rusMonth = gmn.getMonthName(jsDate)
      return day + ' ' + rusMonth + ' ' + dayName + ' ' + myTime
    },
    setCircle (res, summ) {
      let clName = ''
      if ((res / summ) * 100 > 80) {
        clName = ' course-block__result_good '
      } else if ((res / summ) * 100 <= 80 && (res / summ) * 100 > 51) {
        clName = ' course-block__result_middle '
      } else if ((res / summ) * 100 <= 51 && (res / summ) * 100 > 0) {
        clName = ' course-block__result_bad '
      } else {
        clName = ' course-block__result_standart'
      }
      return clName
    },
    getIcon (blocked, done) {
      if (blocked) {
        return ' course-block__icon_block '
      }
      if (done) {
        return ' course-block__icon_done '
      }
      return ' course-block__icon_standart '
    },
    setButtons (obj) {
      for (let btn in obj) {
        if (obj[btn].have) {
          return true
        }
      }
      return false
    },
    toggleBlock (i) {
      this.groups[i].show = !this.groups[i].show
    },
    getShow (i) {
      return this.groups[i].show
    },
    beforeEnter: function (el) {
      el.style.height = '0'
    },
    enter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el) {
      el.style.height = '0'
    },
    showDz () {
      this.dropzoneVis = true
      document.documentElement.style.overflow = 'hidden'
    },

    buildTask (item) {
      this.taskForSending.lesson = item.name
      this.taskForSending.course = this.courseData.id
      this.taskForSending.link = item.buttons.solve.downloadLink
      this.showDz()
    },
    getFiles (file) {
      if (file[0]) {
        let objSending = {
          file: file,
          data: this.taskForSending
        }
        console.log(objSending)
        let formData = new FormData()
        formData.append('file', file)
        formData.append('course', JSON.stringify(this.taskForSending.course))
        formData.append('lesson', JSON.stringify(this.taskForSending.lesson))
        axios
          .post(this.taskForSending.link, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function (resp) {
            console.log(resp)
          })
          .catch(function () {
            console.log('ошибка')
          })
      }
    },
    delDZ (dz) {
      this.dropzoneVis = false
      this.taskForSending = {}
      document.documentElement.style.overflow = 'auto'
      dz.removeAllFiles(true)
    }
  }
}
</script>
<style lang="scss">
@import "../globalStyles/variables";

.main.main-course {
  padding: 0 0 350px 0;
  width: calc(100vw - 272px);
  margin: 0;
  left: 272px;
}

.main-course__banner {
  height: 325px;
  border-radius: 0 0 3px 3px;
  background-color: #5661ab;
  width: 100%;
  color: #ffffff;
  padding-top: 50px;
  padding-bottom: 60px;
}

.course-content {
  width: 757px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.teacher-block {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.teacher-img {
  width: 33px;
  height: 33px;
  background-color: #ffffff;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 10px;
}

.teacher-name {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.21;
  color: #ffffff;
}

.course-title {
  font-size: 30px;
  font-family: $bold;
  line-height: 1.43;
  color: #ffffff;
  margin-bottom: 36px;
}

.main-course__banner {
  .counter__flag {
    display: none;
  }
  .counter__wrap {
    width: 308px;
  }
  .counter-top {
    display: flex;
    margin-bottom: 15px;
  }
  .counter__line {
    width: 100%;
    max-width: 100%;
    height: 15px;
    border-radius: 7.5px;
    background-color: rgba(255, 255, 255, 0.24);
  }
  .counter__subLine {
    height: 15px;
    background-color: #ffffff;
    border-radius: 7.5px;
  }
  .counter__count,
  .counter-text {
    font-size: 15px;
    color: #ffffff;
    font-family: $basic;
  }
  .counter-text {
    padding-left: 4px;
  }
}

.course-group__title-wrap {
  display: flex;
  padding-bottom: 14px;
  width: 100%;
  border-bottom: solid 1px #ececec;
  margin-top: 28px;
  position: relative;
  align-items: center;
  margin-bottom: 14px;
  padding-left: 26px;
  cursor: pointer;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 11px;
    height: 7px;
    background: url("../assets/courseArrow.svg") no-repeat center center /
      contain;
    bottom: 31px;
    right: 25px;
    transition-duration: 0.3s;
    transform: rotate(0deg);
  }
  &.rotate {
    &:after {
      transform: rotate(180deg);
    }
  }
}

.course-group__title-number {
  width: 38px;
  height: 38px;
  background-color: #757f89;
  border-radius: 50%;
  font-size: 15px;
  font-family: $bold;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
}

.course-group__title {
  font-size: 18px;
  font-family: $bold;
  color: #1f1f1f;
}

.course-block {
  width: 757px;
  min-height: 100px;
  border-radius: 3px;
  border: solid 1px #efefef;
  background-color: #ffffff;
  margin-bottom: 13px;
  display: flex;
  padding: 35px 60px 25px 25px;
  position: relative;
  justify-content: space-between;
  z-index: 2;
}

.course-block_blocked.course-block {
  border: solid 1px #efefef;
  background-color: #f6f6f6;
}

.course-block__date {
  font-size: 12px;
  font-weight: 500;
  color: #8e9399;
  margin-bottom: 23px;
}

.course-block__result {
  width: 59px;
  height: 57px;
  border: solid 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  font-weight: 500;
  &_standart {
    border-color: #efefef;
    color: #8e9399;
  }
  &_good {
    color: #b1cd43;
    border-color: #b1cd43;
  }
  &_middle {
    color: #ffbb30;
    border-color: #ffbb30;
  }
  &_bad {
    color: #d0021b;
    border-color: #d0021b;
  }
}

.course-block__title {
  font-size: 15px;
  font-family: $bold;
  color: #2f2f2f;
  margin-bottom: 9px;
}

.course-block__icon {
  border-radius: 50%;
  position: absolute;
}

.course-block__icon_block {
  width: 35px;
  height: 35px;
  background: #eeeeee url("../assets/locked.svg") no-repeat center center / 37%;
  left: 26px;
  top: 26px;
}

.course-block__icon_standart {
  width: 15px;
  height: 15px;
  border: solid 2px #e5e6e8;
  background-color: #f6f6f6;
  left: 36px;
  top: 36px;
}

.course-block__icon_done {
  width: 38px;
  height: 38px;
  background: #eef6ce url("../assets/goodResult.svg") no-repeat center center /
    37%;
  left: 26px;
  top: 36px;
}

.course-block__content {
  padding-left: 87px;
  width: calc(100% - 120px);
}

.course-block__buttons {
  display: flex;
  flex-wrap: wrap;
}

.course-block__button {
  display: flex;
  align-items: center;
  margin-right: 14px;
  position: relative;
  border-radius: 3px;
  height: 30px;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

.course-block__button_task {
  width: 110px;
  border: solid 1px #e6eaeb;
  background-color: #f8f9f9;
  font-size: 12px;
  font-weight: 500;
  color: #41454d;
  padding-left: 39px;
  &:before {
    width: 16px;
    height: 12px;
    background: url("../assets/bookCourse.svg") no-repeat center center /
      contain;
    left: 14px;
  }
}

.course-block__button_material {
  width: 117px;
  border: solid 1px #e6eaeb;
  background-color: #f8f9f9;
  font-size: 12px;
  font-weight: 500;
  color: #41454d;
  padding-left: 39px;
  &:before {
    width: 16px;
    height: 12px;
    background: url("../assets/bookCourse.svg") no-repeat center center /
      contain;
    left: 14px;
  }
}

.course-block__button_razbor {
  width: 152px;
  background-color: #f5a623;
  font-size: 12px;
  font-family: $bold;
  color: #ffffff;
  padding-left: 39px;
  padding-top: 2px;
  letter-spacing: 0.3px;
  &:before {
    background: url("../assets/taskCourse.svg") no-repeat center center /
      contain;
    width: 14px;
    height: 17px;
    left: 15px;
  }
}

.course-block__button_process {
  width: 140px;
  background-color: #edf1f4;
  font-size: 12px;
  font-family: $bold;
  color: #969da6;
  padding-left: 37px;
  &:before {
    background: url("../assets/processCourse.svg") no-repeat center center /
      contain;
    width: 13.3px;
    height: 13.3px;
    left: 16px;
  }
}
.course-block__button_solve {
  width: 147px;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  background-color: #b1cd43;
  font-size: 12px;
  font-family: $bold;
  color: #ffffff;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #8ad35a;
  }
}
.course-group__content {
  transition: 150ms ease-out;
  overflow: hidden;
  position: relative;
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 43px;
    width: 3px;
    height: 90%;
    transform: translateY(-50%);
    top: 50%;
    background-color: #e5e5e5;
    z-index: 1;
  }
}
.course-content_noGroup {
  margin-top: 36px;
}
</style>
