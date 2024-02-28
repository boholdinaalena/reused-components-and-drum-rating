<template>
  <div class="main">
    <BaseModal ref="timer_modal" :haveTimer="true">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad
      praesentium! Dolorum perferendis quis nobis, excepturi quia voluptate
      aperiam iusto necessitatibus dolore, placeat aliquam. Quaerat quas earum
      nihil repellat totam.
    </BaseModal>

    <BaseModal
      ref="base_modal"
      :title="'Заголовок'"
      :haveBtn="true"
      :haveTwoBtn="true"
      :imgSrc="'/flag.svg'"
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis fuga in
      rem repellendus.
    </BaseModal>

    <BaseModal
      ref="pay_modal"
      :name="'Благодарим за покупку!'"
      :haveBtn="true"
      :btnText="'Хорошо!'"
      :imgSrc="'/buy.svg'"
      :glowColor="'green'"
      :haveTimer="true"
    >
      Оплата прошла успешно. Фишки будут начислены на Ваш счет в ближайщее
      время. Желаем вам удачной игры!
    </BaseModal>

    <BaseModal
      ref="new_stage_modal"
      :styleModal="{ height: '260px' }"
      :name="'Новый этап'"
      :haveClose="true"
    >
      Cыграйте одну игру, чтобы получить очки рейтинга и занять место в новом
      этапе лиг.
    </BaseModal>

    <BaseModal
      ref="warning_modal"
      :styleModal="{ height: '200px' }"
      :name="'Внимание'"
      :haveClose="true"
    >
      Недостаточно фишек для старта
    </BaseModal>

    <BaseModal
      ref="account_modal"
      :name="'Ошибка входа'"
      :title="'Повторный вход'"
      :titleColor="'red'"
      :imgSrc="'/warning.svg'"
      :haveBtn="true"
      :btnText="'Перезагрузить'"
    >
      Вы вошли в игру на другом устройстве или в другом окне
    </BaseModal>

    <BaseModal
      ref="redress_modal"
      :name="'Компенсация'"
      :imgSrc="'/five-cones.png'"
      :glowColor="'hsl(125, 100%, 62%)'"
      :title="'Доброго времени суток!'"
      :titleColor="'hsl(125, 100%, 62%)'"
      :haveBtn="true"
      :btnText="'Спасибо!'"
      :styleModal="{ height: '650px' }"
      :haveCones="true"
    >
      22.05.2023 в игре наблядались сбои, которые могли повлиять на игрровые
      процессы.<br />
      В качестве извенения за причисленные неудобства мы начислили на Ваш счет
      фишки!<br />
      Удачи в игре!
    </BaseModal>

    <BaseModal
      ref="reward_modal"
      :name="'Награда за просмотр'"
      :glowColor="'blue'"
      :imgSrc="'/many-cones.png'"
      :haveBtn="true"
      :btnText="'Забрать'"
      :haveCones="true"
      :styleModal="{ height: '420px' }"
    >
      Вы получили фишки!
    </BaseModal>

    <BaseModal
      ref="input_modal"
      :name="'Почта для чека'"
      :haveBtn="true"
      :btnText="'Далее'"
      :haveInput="true"
      :styleModal="{ height: 'fit-content' }"
    >
      Введите email, на который мы пришлем вам электронный чек
    </BaseModal>

    <BaseModal
      ref="attention_modal"
      :name="'Внимание!'"
      :imgSrc="'/warning.svg'"
      :title="'Вы получили предупреждение'"
      :titleColor="'red'"
      :haveBtn="true"
      :btnText="'Ознакомплен'"
      :styleText="{ textAlign: 'left' }"
      :styleModal="{ height: '780px', fontSize: '17px' }"
    >
      Вы видите это сообщение по следующим причинам: <br /><br />
      <ol>
        <li>Использование неподобающего автаара.</li>
        <li>Оскорбление участников игрового сообщества.</li>
        <li>Покупка фишек в обход игрового магазина</li>
      </ol>
      Пожалуйста, следуйте правилам приложения и способствуйте созданиюю
      дружественной атмосверы, чтобы избежать возможных последствий, включая
      бессрочную блокировку аккаунта в случае повторных нарущений.
    </BaseModal>

    <BaseModal
      ref="block_modal"
      :name="'Временная блокировка'"
      :imgSrc="'/warning.svg'"
      :title="'Ваш аккаунт заблокирован!'"
      :titleColor="'red'"
      :haveBtn="true"
      :btnText="'Ознакомплен'"
      :styleText="{ textAlign: 'left', fontSize: '17px' }"
      :styleModal="{ height: '760px' }"
    >
      Вы видите это сообщение по следующим причинам: <br /><br />
      <ol>
        <li>Использование неподобающего автаара.</li>
        <li>Оскорбление участников игрового сообщества.</li>
        <li>Покупка фишек в обход игрового магазина</li>
      </ol>
      Пожалуйста, следуйте правилам приложения и способствуйте созданиюю
      дружественной атмосверы, чтобы избежать возможных последствий, включая
      бессрочную блокировку аккаунта в случае повторных нарущений. Вы видите это
      сообщение по следующим причинам: <br />
    </BaseModal>

    <BaseModal
      ref="total_block_modal"
      :name="'Бессрочная блокировка!'"
      :imgSrc="'/warning.svg'"
      :title="'Ваш аккаунт заблокирован навсегда!'"
      :titleColor="'red'"
      :haveBtn="true"
      :btnImg="'/user.svg'"
      :btnColor="'hsl(220, 100%, 50%)'"
      :btnText="'В поддержку'"
      :styleText="{ textAlign: 'left', marginBottom: '40px' }"
      :styleModal="{ height: 'fit-content', fontSize: '17px' }"
    >
      Вы видите это сообщение по следующим причинам: <br /><br />
      <ol>
        <li>Использование неподобающего автаара.</li>
        <li>Оскорбление участников игрового сообщества.</li>
        <li>Покупка фишек в обход игрового магазина</li>
      </ol>
      Пожалуйста, следуйте правилам приложения и способствуйте созданиюю
      дружественной.
    </BaseModal>

    <div class="wrapper">
      <div class="wrapper-title">Модальные окна:</div>
      <button @click="timer_modal.show()">С таймером</button>
      <button @click="base_modal.show()">Две кнопки</button>
      <button @click="func()">C таймером и кнопкой</button>
      <button @click="new_stage_modal.show()">С возможность закрытия</button>
      <button @click="warning_modal.show()">
        С возможностью закрытия по клику вне окна
      </button>
      <button @click="account_modal.show()">Повторный вход</button>
      <button @click="redress_modal.show()">С фишками</button>
      <button @click="reward_modal.show()">Еще с другими фишкам</button>
      <button @click="input_modal.show()">С пользовательским вводом</button>
      <button @click="attention_modal.show()">Предупреждение лайт</button>
      <button @click="block_modal.show()">Предупреждение медиум</button>
      <button @click="total_block_modal.show()">Конец</button>
    </div>
    <div class="wrapper">
      <div class="wrapper-title">
        Барабан
      </div>
      <UserRatingDrum/>
    </div>
  </div>
</template>

<script setup>
//Initializing modals value
const timer_modal = ref(null)
const base_modal = ref(null)
const pay_modal = ref(null)
const new_stage_modal = ref(null)
const warning_modal = ref(null)
const account_modal = ref(null)
const redress_modal = ref(null)
const reward_modal = ref(null)
const input_modal = ref(null)
const attention_modal = ref(null)
const block_modal = ref(null)
const total_block_modal = ref(null)

//Example void in code
const func = () => {
  pay_modal.value.show()
}
</script>

<style lang="scss">

.main {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 50px;
  margin: 20px 50px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 400px;
  margin: 50px auto;
  gap: 10px;

  &-title {
    font-weight: 900;
    letter-spacing: -0.9px;
    font-size: 25px;
    margin-bottom: 20px;

  }

  button {
    padding: 10px 30px;
    font-size: 15px;
    border: 2px solid rgb(255, 218, 144);
    border-radius: 13px;
    border: none;
    background-color: rgb(0, 9, 49);
    color: white;
    text-align: left;
    box-shadow: 0px 0px 29px -5px #004cff;
  }
}
</style>
