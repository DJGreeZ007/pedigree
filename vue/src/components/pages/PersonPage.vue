<template>
  <PageLayout>
    <ScrollingPanel :sections="sections" />
    <NavigationPanel />
    <section class="p-16">
      <PersonCard :person="person" />
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import PageLayout from '../parts/PageLayout.vue'
import PersonCard from '@/components/cards/PersonCard.vue'
import NavigationPanel from '../ui/NavigationPanel.vue'
import ScrollingPanel from '@/components/ui/ScrollingPanel.vue'
import { emptyPerson } from '@/services/person'
import {getHash} from "@/utils/hash";

export default {
  name: 'PersonPage',
  components: {
    PageLayout,
    PersonCard,
    NavigationPanel,
    ScrollingPanel
  },
  data() {
    return {
      sections: [
        { id: 'info-section', title: 'Общая информация', subSections: []},
        { id: 'parents-section', title: 'Родители', subSections: []},
        { id: 'childs-section', title: 'Дети', subSections: []},
        { id: 'weddings-section', title: 'Брачные союзы', subSections: []},
        { id: 'military-section', title: 'Военная служба', subSections: []}
      ]
    }
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
    }
  },
  mounted() {
    const person = this.person;
    console.log(person);
    this.addSubSection("weddings-section", person.weddings, "Брачный союз")
    this.addSubSection("military-section", person.militaries, "Военная служба")
    // this.addSubSection("work-section", person.militaries, "Работа")
    // this.addSubSection("education-section", person.militaries, "Образование")
  },
  methods: {
    generateSubSectionId(subSectionData) {
      return getHash(subSectionData);
    },
    addSubSection(sectionId, subObjects, title) {
      const section = this.sections.find(section => section.id === sectionId);
      if (section) {
        subObjects.forEach((i, idx) => {
          const newId = this.generateSubSectionId(i);
          section.subSections.push({id: newId, title: `${title} ${idx + 1}`});
        })
      }
    }
  }
}
</script>
