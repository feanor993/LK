<template>
    <div class="wrapper">
        <header-lk></header-lk>
        <user-nav></user-nav>
        <div class="content content-error">
            <div class="error">
                <div class="error-text">
                    <div class="error-title">
                        Упс, ошибочка вышла!
                    </div>
                    <div class="error-descr">
                        <p>
                            Так уж получилось, что вы оказались на странице, которой уже не существует.
                        </p>
                        <p>
                            Пожалуйста, воспользуйтесь навигацией или перейдите в свой профиль, чтобы найти интересующую вас информацию.
                        </p>
                    </div>
                    <router-link to="/profile" class="error-link">Перейти в профиль</router-link>
                </div>
                <div class="error-img">
                    <img src="../assets/error.svg" alt="404">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerLK from '@/components/header.vue'
import userNav from '@/components/userNav.vue'
export default {
  name: 'error',
  components: {
    'header-lk': headerLK,
    'user-nav': userNav
  }
}
</script>
<style lang="scss" scoped>
    @import "../globalStyles/variables.sass";
    .content-error{
        margin-left: 272px;
        height: calc(100vh - 84px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .error{
        display: flex;
        width: 1305px;
        max-width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    .error-img{
        max-width: 60%;
        img{
            width: 100%;
        }
    }
    .error-text{
        width: 574px;
        margin-right: 80px;
    }
    .error-title{
        font-size: 50px;
        font-weight: 500;
        color: #a5a5a5;
        font-family: $medium;
        margin-bottom: 35px;
    }
    .error-descr{
        font-size: 20px;
        font-weight: 500;
        line-height: 1.5;
        color: #404040;
        font-family: $medium;
        margin-bottom: 45px;
        p{
            margin-bottom: 25px;
            &:last-of-type{
                margin-bottom: 0;
            }
        }
    }
    .error-link{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 239px;
        height: 56px;
        border-radius: 3px;
        background-color: #B1CD43;
        font-size: 15px;
        font-weight: bold;
        color: #ffffff;
        font-family: $bold;
        transition: .4s ease;
        &:hover{
            background-color: #98D930;
        }
    }

</style>
