<template>
  <PageLayout>
    <section class="p-16">
      <PersonForm v-model="form" ref="personForm" />
      <SimpleButton 
        class ="person-page__btn" 
        type="primary" 
        @click="() => createPerson()"
      >
        Сохранить
      </SimpleButton>
      <SimpleButton 
        class ="person-page__btn" 
        type="danger" 
        @click="() => cancel()"
      >
        Отмена
      </SimpleButton>
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageLayout from '@/components/parts/PageLayout.vue'
import PersonForm from '@/components/forms/PersonForm.vue'
import { emptyPerson } from '@/services/person'
import SimpleButton from '@/components/ui/SimpleButton.vue'

export default {
  name: 'CreatePersonPage',
  components: {
    PageLayout,
    PersonForm,
    SimpleButton
  },
  data () {
    return {
      form: emptyPerson()
    }
  },
  computed: {
    ...mapGetters('settings', [
      'getMode'
    ]),
    ...mapGetters('persons', [
      'getPersonById'
    ]),
    childId () {
      return this.$route.query.childId
    },
    parentId () {
      return this.$route.query.parentId
    }
  },
  methods: {
    ...mapActions('persons', [
      'addPerson',
      'editPerson'
    ]),
    createPerson() {
      const isEmpty = this.$refs.personForm.checkEmptyForms();
      if (isEmpty) {
        return
      }
      const parentId = this.parentId
      this.addPerson(this.form).then((person) => {
        if(parentId) {
            const parent = this.getPersonById(parentId)
            parent.children.push({child: person.id})
            this.editPerson(parent)
          }
        this.$router.push({ name: "PERSON", params: { id: person.id } });
      });
    },
    cancel () {
      this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.childId) {
      this.form.children.push({child: this.childId})
    }
  }, 
  mounted () {
    if (this.getMode === 'user') {
      this.$router.push({ name: this.$routes.HOME })
    }
  }
}
</script>

<style scoped lang="less">
.person-page {
  &__btn {
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
}
</style>
 