<template>
  <PageLayout>
    <ScrollingPanel :sections="allSections" />
    <NavigationPanel />
    <section class="p-16">
      <PersonCard :person="person" />
    </section>
  </PageLayout>
</template>

<script>
import {mapGetters} from 'vuex'
import PageLayout from '@/components/parts/PageLayout.vue'
import PersonCard from '@/components/cards/PersonCard.vue'
import NavigationPanel from '@/components/ui/NavigationPanel.vue'
import ScrollingPanel from '@/components/ui/ScrollingPanel.vue'
import {emptyPerson} from '@/services/person'

export default {
  name: 'PersonPage',
  components: {
    PageLayout,
    PersonCard,
    NavigationPanel,
    ScrollingPanel
  },
  computed: {
    ...mapGetters('persons', [
      'getPersonById'
    ]),
    person () {
      if (this.getPersonById(this.id)) {
        return this.getPersonById(this.id)
      }
      return emptyPerson()
    },
    id () {
      return this.$route.params.id
    },
    allSections() {
      return [
        {id: 'info-section', title: 'Общая информация', subSections: this.getSubSectionsFor("info", "info", "Информация")},
        {id: 'parents-section', title: 'Родители', subSections: this.getSubSectionsFor("parents", "parent", "Родитель")},
        {id: 'childs-section', title: 'Дети', subSections: this.getSubSectionsFor("childs", "child", "Ребенок")},
        {id: 'weddings-section', title: 'Брачные союзы', subSections: this.getSubSectionsFor("weddings", "wedding", "Брак")},
        {id: 'military-section', title: 'Военная служба', subSections: this.getSubSectionsFor("militaries", "military", "Военная служба")},
        {id: 'education-section', title: 'Образование', subSections: this.getSubSectionsFor("educations", "education", "Образование")},
        {id: 'work-section', title: 'Работа', subSections: this.getSubSectionsFor("works", "work", "Работа")}
      ]
    },
  },
  methods: {
    generateSubSectionId(sectionName, idx) {
      return `${sectionName}-${idx}`;
    },
    getSubSectionsFor(section, linkIdName, showName ) {
      if (!this.person[section]) {
        return [];
      }
      return this.person[section].map((item, idx) => {
        return {
          id: this.generateSubSectionId(linkIdName, idx),
          title: `${showName} ${idx + 1}`
        }
      });
    }
  }
}
</script>
