<template>
  <PageLayout>
    <ScrollingPanel :sections="sections" ref="scrollingPanelRef" />
    <NavigationPanel />
    <section class="p-16">
      <PersonCard :person="person" />
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import PageLayout from '@/components/parts/PageLayout.vue'
import PersonCard from '@/components/cards/PersonCard.vue'
import NavigationPanel from '@/components/ui/NavigationPanel.vue'
import ScrollingPanel from '@/components/ui/ScrollingPanel.vue'
import { emptyPerson } from '@/services/person'

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
    },
    subSections() {
      return {
        "weddings-section": this.person.weddings.map((wedding, idx) => ({
          id: this.generateSubSectionId("wedding", idx),
          title: `Брачный союз ${idx + 1}`
        })),
        "military-section": this.person.militaries.map((military, idx) => ({
          id: this.generateSubSectionId("military", idx),
          title: `Военная служба ${idx + 1}`
        }))
      };
    },
    scrollingPanel() {
      return this.$refs.scrollingPanelRef;
    }
  },
  mounted() {
    const scrollingPanel = this.scrollingPanel;
    this.addSubSections(scrollingPanel);
  },
  methods: {
    generateSubSectionId(sectionName, idx) {
      return `${sectionName}-${idx}`;
    },
    addSubSections(scrollingPanel) {
      this.sections.forEach(section => {
        const subSections = this.subSections[section.id];
        if (subSections && subSections.length > 0) {
          subSections.forEach(subSection => {
            scrollingPanel.addSubSection(section.id, subSection);
          });
        }
      });
    }
  }
}
</script>

