<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 id="speaker">{{ $t("speakersTitle") }}</h2>
      <p class="introSpeakers my-5" v-html="$t('introSpeakers')"></p>
      <v-img
        v-if="speakers.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/flat-icon-mic-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        cover
      ></v-img>
      <v-layout
        v-if="speakers.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          :id="speaker.speakerID"
          v-for="(speaker, i) in speakers"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2 avatar-image speaker"
            :src="speaker.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            cover
          ></v-img>
          <p class="speaker-name my-1">
            {{ speaker.name }}
          </p>
          <p class="speaker-description my-1">
            {{
              $i18n.locale === "en"
                ? speaker.i18nSubtitle[0]
                : speaker.i18nSubtitle[1]
            }}
          </p>
          <p class="speaker-talk my-1">
            {{
              $i18n.locale === "en"
                ? speaker.i18nDescription[0]
                : speaker.i18nDescription[1]
            }}
          </p>
          <v-btn class="my-3" outline flat small @click="toggleSpeaker(i)">
            {{ $t("more") }}
          </v-btn>

          <v-dialog
            v-model="speaker.show"
            scrollable
            width="80%"
            max-width="640px"
            :fullscreen="isMobile"
          >
            <v-card class="card" color="#2f3a58">
              <div class="dialog-card-content pa-4">
                <v-layout row>
                  <div class="ml-3 mr-4">&nbsp;</div>
                  <v-spacer />
                  <h3 class="mb-3">
                    {{ speaker.name }}
                  </h3>
                  <v-spacer />
                  <v-btn
                    class="ma-0"
                    color="accent"
                    flat
                    @click="speaker.show = false"
                    icon
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-layout>
                <v-img
                  class="mb-2 avatar"
                  :src="speaker.icon"
                  max-height="128px"
                  max-width="128px"
                  width="128px"
                  cover
                ></v-img>
                <p class="annotation-text mb-4">
                  {{
                    $i18n.locale === "en"
                      ? speaker.i18nSubtitle[0]
                      : speaker.i18nSubtitle[1]
                  }}
                </p>
                <h4>{{ $t("talkTitle") }}</h4>
                <p class="description mb-4" v-show="speaker.show">
                  {{
                    $i18n.locale === "en"
                      ? speaker.i18nDescription[0]
                      : speaker.i18nDescription[1]
                  }}
                </p>
                <h4>
                  {{
                    speaker.female
                      ? $t("aboutTheSpeakerFemale")
                      : $t("aboutTheSpeakerMale")
                  }}
                </h4>
                <p
                  class="long-description mb-4"
                  v-html="
                    $i18n.locale === 'en'
                      ? speaker.i18nLongDescription[0]
                      : speaker.i18nLongDescription[1]
                  "
                ></p>
              </div>
              <v-card-actions class="dialog-card-footer">
                <v-spacer />
                <v-btn color="accent" flat @click="speaker.show = false">{{
                  $t("button.close")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>

      <h2 id="jury">{{ $t("juryTitle") }}</h2>
      <p class="introJury my-5" v-html="$t('introJury')"></p>
      <v-layout
        v-if="jury.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          v-for="(judge, i) in jury"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2 avatar-image judge"
            :src="judge.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            cover
          ></v-img>
          <p class="judge-title my-1">
            {{
              judge.name ||
                ($i18n.locale === "en"
                  ? judge.i18nTitle[0]
                  : judge.i18nTitle[1])
            }}
          </p>
          <p class="judge-description my-1">
            {{
              $i18n.locale === "en"
                ? judge.i18nDescription[0]
                : judge.i18nDescription[1]
            }}
          </p>
          <v-btn class="my-3" outline flat small @click="toggleJudge(i)">
            {{ $t("more") }}
          </v-btn>

          <v-dialog
            v-model="judge.show"
            scrollable
            width="80%"
            max-width="640px"
            :fullscreen="isMobile"
          >
            <v-card class="card" color="#2f3a58">
              <div class="dialog-card-content pa-4">
                <v-layout row>
                  <div class="ml-3 mr-4">&nbsp;</div>
                  <v-spacer />
                  <h3 class="mb-3">
                    {{ judge.name }}
                  </h3>
                  <v-spacer />
                  <v-btn
                    class="ma-0"
                    color="accent"
                    flat
                    @click="judge.show = false"
                    icon
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-layout>
                <v-img
                  class="mb-4 avatar"
                  :src="judge.icon"
                  max-height="128px"
                  max-width="128px"
                  width="128px"
                  cover
                ></v-img>
                <p class="annotation-text judge mb-4">
                  {{
                    $i18n.locale === "en"
                      ? judge.i18nDescription[0]
                      : judge.i18nDescription[1]
                  }}
                </p>
                <h4>
                  {{
                    judge.female
                      ? $t("aboutTheJudgeFemale")
                      : $t("aboutTheJudgeMale")
                  }}
                </h4>
                <p
                  class="long-description mb-4"
                  v-html="
                    $i18n.locale === 'en'
                      ? judge.i18nLongDescription[0]
                      : judge.i18nLongDescription[1]
                  "
                ></p>
              </div>
              <v-card-actions class="dialog-card-footer">
                <v-spacer />
                <v-btn color="accent" flat @click="judge.show = false">{{
                  $t("button.close")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>

      <h2 id="mentor">{{ $t("mentorsTitle") }}</h2>
      <p class="introMentors my-5" v-html="$t('introMentors')"></p>
      <v-layout class="mb-5" row align-center justify-center wrap>
        <v-btn
          class="mt-2"
          width="auto"
          href="https://drive.google.com/open?id=1lUkfoDLM9URdCJRqDsVAI7X83AYuTgpC"
          target="_blank"
          color="info"
          outline
          flat
        >
          {{ $t("button.downloadMentoringFacts") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <v-btn
          class="mt-2"
          width="auto"
          href="https://forms.gle/ZvJ6ZSBu7YvGpiBRA"
          target="_blank"
          color="warning"
          outline
          flat
        >
          {{ $t("button.registerAsMentor") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </v-layout>
      <v-img
        v-if="mentors.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/flat-icon-persons-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        cover
      ></v-img>
      <v-layout
        v-if="mentors.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          v-for="(mentor, i) in mentors"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            :class="`mx-4 my-2 avatar-image mentor ${mentor.category}`"
            :src="mentor.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            cover
          ></v-img>
          <p class="mentor-title my-1">
            {{ mentor.name }}
          </p>
          <p class="mentor-description my-1">
            {{
              $i18n.locale === "en"
                ? mentor.i18nOrganisation[0]
                : mentor.i18nOrganisation[1]
            }}
          </p>
          <p :class="`mentor-expertise my-1 ${mentor.category}`">
            {{
              $i18n.locale === "en"
                ? mentor.i18nExpertise[0]
                : mentor.i18nExpertise[1]
            }}
          </p>
          <p class="mentor-availability my-1">
            {{
              $i18n.locale === "en"
                ? mentor.i18nAvailability[0]
                : mentor.i18nAvailability[1]
            }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
const MENTOR_CATEGORY = {
  TEAM_BUILDER: "teamBuilder",
  EXPERT: "expert",
  PITCH_TRAINER: "pitchTrainer"
};

export default {
  name: "Staff",
  props: {
    themeColor: {
      type: String,
      default: "primary"
    },
    isMobile: Boolean
  },
  methods: {
    toggleSpeaker(i) {
      const clickedSpeaker = this.speakers[i];
      const prevShow = this.speakers[i].show;

      this.speakers.forEach(c => (c.show = false));
      clickedSpeaker.show = !prevShow;
    },
    toggleJudge(i) {
      const clickedJury = this.jury[i];
      const prevShow = this.jury[i].show;

      this.jury.forEach(c => (c.show = false));
      clickedJury.show = !prevShow;
    }
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  },
  data() {
    return {
      speakers: [
        {
          speakerID: "michael-groetsch",
          icon: require("../../assets/speaker/speaker-mayor.jpg"),
          name: "Michael Grötsch",
          i18nSubtitle: [
            "Mayor of the City of Mannheim for Economy, Labour, Social Affairs and Culture",
            "Bürgermeister der Stadt Mannheim für Wirtschaft, Arbeit, Soziales und Kultur"
          ],
          i18nDescription: ['"Welcoming"', '"Grußwort"'],
          i18nLongDescription: [
            "Michael Grötsch has been Mayor of the City of Mannheim for Economy, Labour, Social Affairs and Culture since March 2008. The department, which emerged from the modernisation process of the city administration of Mannheim at the time, combines Mannheim's central strategic potential. In this context, a new economic policy strategy was launched in 2010 to position Mannheim even better as a leading business and industrial location. This strategy is being continuously further developed. One example of this is the regional competence fields of energy (efficiency) and the environment, which put topics such as the Climathon on the agenda.",
            "Michael Grötsch ist seit März 2008 Bürgermeister der Stadt Mannheim für Wirtschaft, Arbeit, Soziales und Kultur. Das Dezernat – damals aus einem Modernisierungsprozess der Stadtverwaltung Mannheim hervorgegangen – vereint zentrale strategische Potenziale Mannheims. In diesem Zusammenhang wurde 2010 eine neue wirtschaftspolitische Strategie auf den Weg gebracht, um Mannheim als führenden Wirtschafts- und Industriestandort noch besser zu positionieren. Diese Strategie wird stetig weiterentwickelt. Ein Beispiel dafür sind die regionalen Kompetenzfelder Energie(-effizienz) und Umwelt, die Themen wie den Climathon auf die Agenda nehmen."
          ],
          female: false,
          show: false
        },
        {
          speakerID: "julian-schroegel",
          icon: require("../../assets/speaker/speaker-schroegel.jpeg"),
          name: "Julian Schrögel",
          i18nSubtitle: [
            "Head of Unit • Rhein-Neckar-Verkehr GmbH",
            "Referatsleiter • Rhein-Neckar-Verkehr GmbH"
          ],
          i18nDescription: [
            '"Digital innovations and new business segments in public transport"',
            '"Digitale Innovationen und neue Geschäftsfelder im ÖPNV"'
          ],
          i18nLongDescription: [
            "Head of Unit • Rhein-Neckar-Verkehr GmbH",
            "Referatsleiter • Rhein-Neckar-Verkehr GmbH"
          ],
          female: false,
          show: false
        },
        {
          speakerID: "jonas-wagner",
          icon: require("../../assets/speaker/speaker-wagner.jpg"),
          name: "Jonas Wagner",
          i18nSubtitle: ["ABB AG", "ABB AG"],
          i18nDescription: ['"Mission to Zero"', '"Mission to Zero"'],
          i18nLongDescription: [
            "My goal is for everyone to do exactly what they do best. I studied dual project engineering at ABB. There I am in sales and support companies with OPTIMAX as an energy management solution on their way to saving energy costs and making their electricity purchases CO2-neutral. I am also an independent financial planner with start-up experience and a strong interest in personal development. I wish all participants lots of fun and success over the weekend - let's bundle our energy, create great things and drive change.",
            "Mein Ziel ist es, dass jeder nur genau das macht, was er am besten kann. Ich habe dual Projekt Engineering bei ABB studiert. Dort bin ich im Vertrieb und unterstütze Firmen mit OPTIMAX als Lösung für Energiemanagement auf dem Weg, Energiekosten zu sparen und ihren Strombezug CO2-neutral zu gestalten. Daneben bin ich selbstständiger Finanzplaner mit Gründererfahrung und starkem Interesse an persönlicher Entwicklung. Allen Teilnehmern wünsche ich an dem Wochenende viel Spaß und Erfolg - lasst uns unsere Energie bündeln, Großes schaffen und Veränderung treiben."
          ],
          female: false,
          show: false
        },
        {
          speakerID: "michael-thron",
          icon: require("../../assets/speaker/speaker-michael.jpg"),
          name: "Michael Thron",
          i18nSubtitle: [
            "Board member and founder of objective partner AG",
            "Vorstand und Gründer der objective partner AG"
          ],
          i18nDescription: [
            '"There is no planet B - What IT can contribute to climate protection"',
            '"There is no planet B – Was die IT zum Klimaschutz beitragen kann"'
          ],
          i18nLongDescription: [
            "Board member and founder of objective partner AG",
            "Vorstand und Gründer der objective partner AG"
          ],
          female: false,
          show: false
        },
        {
          speakerID: "hannah-helmke",
          icon: require("../../assets/speaker/speaker-hannah.jpg"),
          name: "Hannah Helmke",
          i18nSubtitle: [
            "Managing director and co-founder of right. based on science",
            "Geschäftsführerin und Mitbegründerin von right. based on science"
          ],
          i18nDescription: [
            '"On the other side of the Rubicon"',
            '"Auf der anderen Seite des Rubikon"'
          ],
          i18nLongDescription: [
            'Hannah Helmke is managing director of right. based on science, a model developer for climate impact calculations based in Frankfurt am Main. Together with Dr. Sebastian Müller, she founded the young company in August 2016 with the aim of generating transparency on economic risks and opportunities associated with climate change. Using the proprietary X-Degree Compatibility (XDC) model developed by right. based on science, Climate Impact performs calculations that quantify the contribution of an economic unit to climate change. Hannah Helmke has an academic background in psychology and international business. She gained experience in the use of science-based climate metrics at Deutsche Post DHL and the IT service provider BridgingIT GmbH. Her expertise in scenario analysis stems from the development of the XDC model, scenario analysis for customers in the real and financial economy, the design of the "TCFD Think Tank" of the Green and Sustainable Finance Cluster Germany e.V. and her participation in conferences such as the Scenarios Forum 2019 in Denver.',
            "Hannah Helmke ist Geschäftsführerin von right. based on science, einem Modellentwickler für Climate Impact Berechnungen aus Frankfurt am Main. Zusammen mit Dr. Sebastian Müller gründete sie im August 2016 das junge Unternehmen mit dem Ziel, Transparenz zu wirtschaftlichen Risiken und Chancen einhergehend mit dem Klimawandel zu generieren. Mit dem eigens entwickelten proprietären X-Degree Compatibility (XDC) Modell führt right. based on science Climate Impact Berechnungen durch, die den Beitrag einer wirtschaftlichen Einheit zum Klimawandel beziffern. Hannah Helmke hat einen akademischen Hintergrund in Psychologie und International Business. Erfahrungen zum Einsatz von wissenschaftsbasierten Klimametriken sammelte sie u.a. bei der Deutschen Post DHL und dem IT-Servicedienstleister BridgingIT GmbH. Ihre Fachexpertise zur Szenarioanalyse entstammt der Entwicklung des XDC Modells, der Szenarioanalyse bei Kunden aus Real- und Finanzwirtschaft, der Ausgestaltung des „TCFD Think Tank“ des Green and Sustainable Finance Cluster Germany e.V. sowie ihrer Teilnahme an Fachkonferenzen wie dem Scenarios Forum 2019 in Denver."
          ],
          female: true,
          show: false
        },
        {
          speakerID: "robert-thomann",
          icon: require("../../assets/speaker/speaker-thomann.jpg"),
          name: "Dr. Robert Thomann",
          i18nSubtitle: [
            "Innovation Manager MVV Energy AG",
            "Innovationsmanager MVV Energie AG"
          ],
          i18nDescription: [
            '"Urbanization, digitization, utilities - at the interface to the Smart City."',
            '"Urbanisierung, Digitalisierung, Versorger – An der Nahtstelle zur Smart City."'
          ],
          i18nLongDescription: [
            "Dr. Robert Thomann is Innovation Manager at MVV Energie AG in Mannheim. There he is responsible for various research projects, including the E-Energy project Modellstadt Mannheim and the battery research project Strombank. He also represents MVV Energie on the Executive Board of the Mannheim Smart Production Initiative (Industry 4.0), StoREgio Energiespeichersysteme e.V. and Smart Grids-Plattform Baden-Württemberg e.V. Before joining MVV Energie, he headed the Innovation and Patents division at Carl Zeiss Vision. Dr. Robert Thomann started his career at tesa scribos GmbH, a start-up of the University of Mannheim, which offers technical solutions for product protection and product tracking and is now a wholly-owned subsidiary of tesa SE.",
            "Dr. Robert Thomann ist Innovationsmanager der MVV Energie AG in Mannheim. Dort verantwortet er verschiedene Forschungsprojekte unter anderem das E-Energy Projekt Modellstadt Mannheim und das Batterieforschungsprojekt Strombank. Daneben sitzt er als Vertreter der MVV Energie im Executive Board der Initiative Smart Produktion Mannheim (Industrie 4.0), StoREgio Energiespeichersysteme e.V. und Smart Grids-Plattform Baden-Württemberg e.V. Vor seiner Tätigkeit bei der MVV Energie leitete er den Bereich Innovation und Patente bei der Carl Zeiss Vision. Dr. Robert Thomann startete seine berufliche Laufbahn bei der tesa scribos GmbH, einem Start-up der Universität Mannheim, das technischen Lösungen zum Produktschutz und Produktverfolgung anbietet und heute eine 100-ige Tochter der tesa SE ist."
          ],
          female: false,
          show: false
        },
        {
          speakerID: "daniel-erlemeier",
          icon: require("../../assets/speaker/speaker-daniel.jpg"),
          name: "Daniel Erlemeier",
          i18nSubtitle: [
            "Head of Donor Communications and Education, BOS Deutschland e.V.",
            "Leiter der Spenderkommunikation und Bildung, BOS Deutschland e.V."
          ],
          i18nDescription: [
            '"Why should you care about Indonesian peat?"',
            '"Warum solltest du dich um indonesischen Torf sorgen?"'
          ],
          i18nLongDescription: [
            "Daniel Erlemeier is working for Borneo Orangutan Survival (BOS) and is responsible for donor communications as well as the organizations educational programs. His motto: In order to be able to communicate you need to understand first. Therefore, he volunteered eight weeks in the projects of BOS in Indonesia that include two rescue centers for more than 500 orphaned orangutans. But what keeps him awake at night even more than orangutan babies, is the shocking view of the degraded peatland of Mawas: A dire landscape that used to be vivid rainforest and home of wild orangutans.",
            "Daniel Erlemeier arbeitet für Borneo Orang-Utan Survival (BOS) und ist verantwortlich für die Spenderkommunikation sowie die Bildungsprogramme der Organisation. Sein Motto: Um kommunizieren zu können, muss man zuerst verstehen. Deshalb engagierte er sich ehrenamtlich acht Wochen lang in den Projekten von BOS in Indonesien, darunter zwei Rettungszentren für mehr als 500 verwaiste Orang-Utans. Aber was ihn nachts noch mehr wach hält als Orang-Utan-Babys, ist der schockierende Blick auf das degradierte Moorland von Mawas: Eine entsetzliche Landschaft, die einst lebendiger Regenwald war und Heimat wilder Orang-Utans."
          ],
          female: false,
          show: false
        },
        {
          speakerID: "agnes-schoenfelder",
          icon: require("../../assets/speaker/speaker-agnes.jpg"),
          name: "Agnes Schönfelder",
          i18nSubtitle: [
            "Head of the Climate Change Strategy Office, City of Mannheim",
            "Leiterin der Klimaschutzleitstelle, Stadt Mannheim"
          ],
          i18nDescription: [
            '"Wind of Change for Mannheim on Climate Track"',
            '"Frischer Wind für Mannheim auf Klimakurs"'
          ],
          i18nLongDescription: [
            "Agnes Schönfelder has been acting in public authorities at municipal and state level over 20 years, since 2009 as the Head of the Climate Change Strategy Office for the City of Mannheim in a cross-departmental function. In addition to her activities at the municipality, she had taken over the management of the Climate Action Agency Mannheim at the beginning of 2019 and will thus combine the activities for the implementation of the local climate protection strategy MANNHEIM ON CLIMATE TRACK city-wide. The climate protection and communication expert is a civil engineer by profession and has completed further studies in environmental and climate issues as well as a management consultant. Her main task is to develop climate strategies and to coordinate mitigation and adaptation projects. She is an expert for peer-to-peer exchange and large-scale networking in capacity building processes to transfer of good practice not only within the city but on European and international stage. She is particularly interested in cooperation and communication, both in local and regional and international networks.",
            "Agnes Schönfelder ist seit über 20 Jahren auf kommunaler und nationaler Ebene in der öffentlichen Verwaltung tätig und leitet seit 2009 dezernats- und fachübergreifend die Klimaschutzleitstelle der Stadt Mannheim. Zusätzlich zu ihren Aktivitäten bei der Stadtverwaltung übernahm sie Anfang 2019 die Leitung der Klimaschutzagentur Mannheim und wird damit die Aktivitäten zur Umsetzung der lokalen Klimaschutzstrategie MANNHEIM KLIMAKURS stadtweit zusammenführen. Die Klimaschutz- und Kommunikationsexpertin ist von Beruf Bauingenieur und hat weitere Studien in Umwelt- und Klimafragen sowie als Managementreferentin absolviert. Ihre Hauptaufgabe ist es, Klimastrategien zu entwickeln und Klimaschutz- und Anpassungsprojekte zu koordinieren. Sie ist eine Expertin für den Erfahrungsaustausch und die umfassende Vernetzung zum Aufbau von Strukturen und die Gestaltung von Prozessen nicht nur innerhalb der Stadt, sondern auch auf europäischer und internationaler Ebene. Ihr besonderes Interesse gilt der Zusammenarbeit und Kommunikation in lokalen und regionalen sowie internationalen Netzwerken."
          ],
          female: true,
          show: false
        }
      ],
      jury: [
        {
          icon: require("../../assets/jury/jury-LMS.jpg"),
          name: "Prof. Dr. Laura Marie Edinger-Schons",
          i18nDescription: [
            "University of Mannheim | Business School | Chair of Corporate Social Responsibility",
            "Universität Mannheim | Business School | Lehrstuhl für Corporate Social Responsibility"
          ],
          i18nLongDescription: [
            "Laura Marie Edinger-Schons is a Professor of Corporate Social Responsibility at the University of Mannheim. In her research, she is interested in the question how organizations (for-profit, non-profit and everything in between) can contribute to sustainable development as defined in the United Nations Sustainable Development Goals. Her work has been published in renowned academic journals such as the Journal Marketing, Journal of the Academy of Marketing Science, Journal of Business Ethics, or the Journal of Consumer Psychology. She is a co-founder of the Digital Social Innovation Lab as well as the Peer School for Sustainable Development.",
            "Laura Marie Edinger-Schons ist Professorin für Corporate Social Responsibility an der Universität Mannheim. In ihrer Forschung interessiert sie sich für die Frage, wie Organisationen (for-profit, non-profit und alles dazwischen) zu einer nachhaltigen Entwicklung im Sinne der Ziele der Vereinten Nationen für nachhaltige Entwicklung beitragen können. Ihre Arbeiten wurden in renommierten Fachzeitschriften wie dem Journal Marketing, dem Journal of the Academy of Marketing Science, dem Journal of Business Ethics oder dem Journal of Consumer Psychology veröffentlicht. Sie ist Mitbegründerin des Digital Social Innovation Lab sowie der Peer School for Sustainable Development."
          ],
          female: true,
          show: false
        },
        {
          icon: require("../../assets/jury/jury-marianne.jpg"),
          name: "Marianne Crevon",
          i18nDescription: [
            "Financial Director Climate Protection Agency Mannheim gGmbH",
            "Kaufmännische Leiterin Klimaschutzagentur Mannheim gGmbH"
          ],
          i18nLongDescription: [
            'Marianne Crevon is financial director of the climate protection agency Mannheim gGmbH. After a first professional experience in Canada the trained bioinformatician has reoriented her career towards sustainability and completed an Advanced Master in Environmental Protection Consulting in 2012. She then devoted herself to sustainable mobility and worked as a development officer for CarSharing in southern Alsace until she moved to Mannheim in 2015. At the Climate Protection Agency, she participated in numerous campaigns to strengthen climate awareness, further developed the climate educational program and led the "Spare your car" campaign. She is a certified energy consultant since 2018.',
            "Marianne Crevon ist kaufmännische Leiterin der Klimaschutzagentur Mannheim gGmbH. Die Bioinformatikerin von Beruf hat nach einer ersten Berufserfahrung in Kanada ihre Karriere neu ausgerichtet und 2012 einen Advanced Master in Umweltschutzberatung absolviert. Im Anschluss hat sie sich der nachhaltigen Mobilität gewidmet und als regionale Referentin für CarSharing im Süd Elsass gearbeitet, bis sie 2015 nach Mannheim gezogen ist. Bei der Klimaschutzagentur hat sie bei zahlreichen Aktionen zur Stärkung des Klimabewusstseins mitgewirkt, das Bildungsangebot weiterentwickelt und die Kampagne „Spar dir dein Auto!“ geleitet. Seit 2018 ist sie zertifizierte Energieberaterin."
          ],
          female: true,
          show: false
        },
        {
          icon: require("../../assets/jury/jury-thomann.jpg"),
          name: "Dr. Robert Thomann",
          i18nDescription: [
            "Innovation Manager MVV Energy AG",
            "Innovationsmanager MVV Energie AG"
          ],
          i18nLongDescription: [
            "Dr. Robert Thomann is Innovation Manager at MVV Energie AG in Mannheim. There he is responsible for various research projects, including the E-Energy project Modellstadt Mannheim and the battery research project Strombank. He also represents MVV Energie on the Executive Board of the Mannheim Smart Production Initiative (Industry 4.0), StoREgio Energiespeichersysteme e.V. and Smart Grids-Plattform Baden-Württemberg e.V. Before joining MVV Energie, he headed the Innovation and Patents division at Carl Zeiss Vision. Dr. Robert Thomann started his career at tesa scribos GmbH, a start-up of the University of Mannheim, which offers technical solutions for product protection and product tracking and is now a wholly-owned subsidiary of tesa SE.",
            "Dr. Robert Thomann ist Innovationsmanager der MVV Energie AG in Mannheim. Dort verantwortet er verschiedene Forschungsprojekte unter anderem das E-Energy Projekt Modellstadt Mannheim und das Batterieforschungsprojekt Strombank. Daneben sitzt er als Vertreter der MVV Energie im Executive Board der Initiative Smart Produktion Mannheim (Industrie 4.0), StoREgio Energiespeichersysteme e.V. und Smart Grids-Plattform Baden-Württemberg e.V. Vor seiner Tätigkeit bei der MVV Energie leitete er den Bereich Innovation und Patente bei der Carl Zeiss Vision. Dr. Robert Thomann startete seine berufliche Laufbahn bei der tesa scribos GmbH, einem Start-up der Universität Mannheim, das technischen Lösungen zum Produktschutz und Produktverfolgung anbietet und heute eine 100-ige Tochter der tesa SE ist."
          ],
          female: false,
          show: false
        },
        {
          icon: require("../../assets/jury/jury-schreiber.jpg"),
          name: "Clemens Schreiber",
          i18nDescription: [
            "Karlsruhe Institute of Technology (KIT)",
            "Karlsruher Institut für Technologie (KIT)"
          ],
          i18nLongDescription: [
            "I am doing research at KIT in the area of sustainable software engineering. At KIT we are looking for opportunities to improve sustainability with the help of information technology and to integrate the sustainability approach in software development.",
            "Ich forsche am KIT im Bereich des nachhaltigen Software-Engineerings. Am KIT suchen wir nach Möglichkeiten, die Nachhaltigkeit mit Hilfe der Informationstechnologie zu verbessern und den Nachhaltigkeitsansatz in die Softwareentwicklung zu integrieren."
          ],
          female: false,
          show: false
        },
        {
          icon: require("../../assets/jury/jury-sonja.jpg"),
          name: "Sonja Wilkens",
          i18nDescription: [
            "Startup Consultant for Economic and Structural Development of the City of Mannheim",
            "Startup Beraterin der Wirtschafts- und Strukturförderung der Stadt Mannheim"
          ],
          i18nLongDescription: [
            "Sonja Wilkens has been a start-up consultant for the economic and structural development of the City of Mannheim for over 10 years. Her focus is to support innovative teams from universities and colleges in the development of a business model. After studying business administration, the business graduate worked for many years at Investitionsbank Berlin and acquired special expertise in financing young companies. As a research associate at the University of Mannheim at the Institute for SME Research, she has investigated the implementation of technology and innovation in companies and their change. As an expert on business models and the financing of start-ups, she sees no contradiction in developing sustainable and social products or services while at the same time implementing them economically.",
            "Sonja Wilkens ist seit über 10 Jahren Startup Beraterin der Wirtschafts- und Strukturförderung der Stadt Mannheim. Innovative Teams aus Universitäten und Hochschulen bei der Erarbeitung eines Geschäftsmodels zu unterstützen ist dabei ihr Schwerpunkt. Nach dem Studium der BWL hat die Diplom-Kauffrau viele Jahre bei der Investitionsbank Berlin gearbeitet und sich besondere Expertise in der Finanzierung von jungen Unternehmen angeeignet. Als wissenschaftliche Mitarbeiterin der Universität Mannheim am Institut für Mittelstandsforschung hat sie die Umsetzung von Technologie- und Innovation in Unternehmen und deren Wandel untersucht. Als Expertin für Geschäftsmodelle und Finanzierung von Startups sieht sie keinen Widerspruch darin, sowohl nachhaltige und soziale Produkte oder Dienstleistungen zu entwickeln und diese gleichzeitig wirtschaftlich umzusetzen."
          ],
          female: false,
          show: false
        },
        {
          icon: require("../../assets/jury/jury-schacht.jpg"),
          name: "Dr. Silvia Schacht",
          i18nDescription: [
            "Head of Digital Innovations Department • Rhein-Neckar-Verkehr GmbH",
            "Abteilungsleitung Digitale Innovationen • Rhein-Neckar-Verkehr GmbH"
          ],
          i18nLongDescription: [
            "I studied business informatics at the University of Mannheim and subsequently completed my doctorate in this field. In December 2017 I took up my position at rnv as a digitization consultant and since October 2019 I have been head of the Digital Development department at rnv.",
            "Ich habe Wirtschaftsinformatik an der Uni Mannheim studiert und anschließend in diesem Fachbereich auch promoviert. Im Dezember 2017 bin ich bei der rnv meine Stelle als Referentin Digitalisierung angetreten und seit Oktober 2019 Abteilungsleiterin der Abteilung Digitale Entwicklungen in der rnv."
          ],
          female: false,
          show: false
        }
        // {
        //   icon: require("../../assets/flat-icon-scientist.svg"),
        //   i18nTitle: ["The Scientist", "Die Wissenschaftlerin"],
        //   i18nDescription: [
        //     "She observes, discusses and concludes with a knife sharp mind and a concentrated understanding.",
        //     "Sie beobachtet, diskutiert und besticht mit einem messerscharfen Verstand und einem konzentrierten Verständnis."
        //   ]
        // },
        // {
        //   icon: require("../../assets/flat-icon-alien.svg"),
        //   i18nTitle: ["The Second Scientist", "Der zweite Wissenschaftler"],
        //   i18nDescription: [
        //     "Experienced, brilliant and heard, our scientists cannot be ignored.",
        //     "Erfahren, brillant und hörenswert, können unsere Wissenschaftler nicht ignoriert werden."
        //   ]
        // },
        // {
        //   icon: require("../../assets/flat-icon-man.svg"),
        //   i18nTitle: ["The Economist", "Der Ökonom"],
        //   i18nDescription: [
        //     "Every project must also be financed, if there are gaps in the business model our expert will find them.",
        //     "Jedes Projekt muss auch finanziert werden, wenn es Lücken im Geschäftsmodell gibt, wird unser Experte sie finden."
        //   ]
        // },
        // {
        //   icon: require("../../assets/flat-icon-man-sunglasses.svg"),
        //   i18nTitle: ["Media Expert", "Medienexperte"],
        //   i18nDescription: [
        //     "With a broad overview of other climate projects, the media expert knows which needs are not yet covered.",
        //     "Mit einem breiten Überblick über andere Klimaprojekte weiß der Medienexperte, welche Bedürfnisse noch nicht abgedeckt sind."
        //   ]
        // },
        // {
        //   icon: require("../../assets/flat-icon-man-beard.svg"),
        //   i18nTitle: ["Rep of the City", "Vertreter der Stadt"],
        //   i18nDescription: [
        //     "Mannheim is his specialty, you think you are already an expert of your city? Think about it again.",
        //     "Mannheim ist seine Spezialität. Du denkst, du bist schon ein Experte deiner Stadt? Denke noch einmal darüber nach."
        //   ]
        // },
        // {
        //   icon: require("../../assets/flat-icon-woman.svg"),
        //   i18nTitle: ["Hackerwoman", "Hackerwoman"],
        //   i18nDescription: [
        //     "0010 1001 1111 1001 1001 1000 0000 0111 0001 0110 1010 0101 0011 1100 0011 0000 0010 0100",
        //     "0010 1001 1111 1001 1001 1000 0000 0111 0001 0110 1010 0101 0011 1100 0011 0000 0010 0100"
        //   ]
        // }
      ],
      mentors: [
        {
          icon: require("../../assets/mentor/mentor-bandtel.jpg"),
          name: "Matthias Bandtel",
          category: MENTOR_CATEGORY.TEAM_BUILDER,
          i18nOrganisation: [
            "Mannheim University of Applied Sciences | kompass",
            "Hochschule Mannheim | kompass"
          ],
          i18nExpertise: [
            "Design Thinking, Human Centered Design, Interdisciplinarity",
            "Design Thinking, Human Centered Design, Interdisziplinarität"
          ],
          i18nAvailability: [
            "Friday 16:00h - 19:00h",
            "Freitag 16:00h - 19:00h"
          ]
        },
        // {
        //   icon: require("../../assets/mentor/mentor-jasmin.png"),
        //   name: "Jasmin Weber",
        //   category: MENTOR_CATEGORY.TEAM_BUILDER,
        //   i18nOrganisation: [
        //     "GfK Entertainment GmbH",
        //     "GfK Entertainment GmbH"
        //   ],
        //   i18nExpertise: ["Team Building", "Team Building"],
        //   i18nAvailability: [
        //     "Friday 16:00h - 19:00h",
        //     "Freitag 16:00h - 19:00h"
        //   ]
        // },
        {
          icon: require("../../assets/mentor/mentor-boes.jpg"),
          name: "Matthias Bös",
          category: MENTOR_CATEGORY.TEAM_BUILDER,
          i18nOrganisation: [
            "valantic CEC Deutschland GmbH",
            "valantic CEC Deutschland GmbH"
          ],
          i18nExpertise: [
            "Innovation Facilitation, Moderation",
            "Innovationsförderung, Moderation"
          ],
          i18nAvailability: [
            "Friday 16:00h - 19:00h",
            "Freitag 16:00h - 19:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-konstantin.jpeg"),
          name: "Konstantin Heine",
          category: MENTOR_CATEGORY.TEAM_BUILDER,
          i18nOrganisation: ["SAP SE", "SAP SE"],
          i18nExpertise: [
            "Design Thinking, Business Model Innovation",
            "Design Thinking, Business Model Innovation"
          ],
          i18nAvailability: [
            "Friday 16:00h - 19:00h",
            "Freitag 16:00h - 19:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-robert.jpg"),
          name: "M.A., Robert Lahdo",
          category: MENTOR_CATEGORY.TEAM_BUILDER,
          i18nOrganisation: [
            "Baden-Wuerttemberg Cooperative State University Mannheim",
            "Duale Hochschule Baden-Württemberg Mannheim"
          ],
          i18nExpertise: [
            "Design Thinking, BMC, Innovationsmanagement, Social Entrepreneurship",
            "Design Thinking, BMC, Innovationsmanagement, Sozialunternehmertum"
          ],
          i18nAvailability: [
            "Friday 16:00h - 19:00h",
            "Freitag 16:00h - 19:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-elena.png"),
          name: "Elena Langenfelder",
          category: MENTOR_CATEGORY.TEAM_BUILDER,
          i18nOrganisation: ["BASF SE", "BASF SE"],
          i18nExpertise: ["Team Building", "Team Building"],
          i18nAvailability: [
            "Friday 16:00h - 19:00h",
            "Freitag 16:00h - 19:00h"
          ]
        },

        // EXPERTS
        {
          icon: require("../../assets/mentor/mentor-sergey.jpg"),
          name: "M.Sc., Sergey Makaryan",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["", ""],
          i18nExpertise: [
            "Sustainability (Circular Economy, Environment/Sustainability Management, Life Cycle Assessment)",
            "Nachhaltigkeit (Kreislaufwirtschaft, Umwelt-/Nachhaltigkeitsmanagement, Ökobilanz)"
          ],
          i18nAvailability: [
            "Saturday 10:00h - 20:00h",
            "Samstag 10:00h - 20:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-bos.jpg"),
          name: "Denitza Toteva",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["BOS Deutschland e.V.", "BOS Deutschland e.V."],
          i18nExpertise: [
            "Sustainability (sustainable economics)",
            "Nachhaltigkeit (Nachhaltigkeitsökonomie)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 22:00h & Saturday 10:00h - 18:00h",
            "Freitag 18:00h - 22:00h & Samstag 10:00h - 18:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-cookie.png"),
          name: "Christoph Martens",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: [
            "Artificial Engineering",
            "Artificial Engineering"
          ],
          i18nExpertise: [
            "Technology (Software, Automation, Adaptive and Self-Learning Systems, Web Intelligence)",
            "Technologie (Software, Automatisierung, Adaptive und selbstlernende Systeme, Web Intelligence)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 20:00h & Saturday 14:00h - 20:00h",
            "Freitag 18:00h - 20:00h & Samstag 14:00h - 20:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-schreiber.jpg"),
          name: "Clemens Schreiber",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: [
            "Karlsruhe Institute of Technology (KIT)",
            "Karlsruher Institut für Technologie (KIT)"
          ],
          i18nExpertise: [
            "Sustainability (Sustainable Software Development, Machine Learning, Process Mining)",
            "Nachhaltigkeit (Nachhaltige Softwareentwicklung, Machine Learning, Process Mining)"
          ],
          i18nAvailability: [
            "Saturday 10:00h - 18:00h",
            "Samstag 10:00h - 18:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-joerg.jpeg"),
          name: "Jörg Bernauer",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["Priming Cloud", "Priming Cloud"],
          i18nExpertise: [
            "Technology (Development, BigData, Software Architecture)",
            "Technologie (Entwicklung, BigData, Software Architektur)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 20:00h & Saturday 12:00h - 18:00h",
            "Freitag 18:00h - 20:00h & Samstag 12:00h - 18:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-doose.jpg"),
          name: "Jens Doose",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: [
            "Onwerk GmbH Software Agency",
            "Onwerk GmbH Softwareagentur"
          ],
          i18nExpertise: [
            "Technology (Software Development, Programming, Deployment)",
            "Technologie (Softwareentwicklung, Programmierung, Deployment)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 22:00h & Saturday 12:00h - 18:00h",
            "Freitag 18:00h - 22:00h & Samstag 12:00h - 18:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-michael.jpg"),
          name: "Michael Binder",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["UEBERBIT GmbH", "UEBERBIT GmbH"],
          i18nExpertise: [
            "Technology (Web-Development, Programming)",
            "Technologie (Web-Entwicklung, Programmierung)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 20:00h & Saturday 10:00h - 14:00h",
            "Freitag 18:00h - 20:00h & Samstag 10:00h - 14:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-hannes.jpg"),
          name: "Hannes Schütz",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["UEBERBIT GmbH", "UEBERBIT GmbH"],
          i18nExpertise: [
            "Technology (Web-Development, Programming)",
            "Technologie (Web-Entwicklung, Programmierung)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 20:00h & Saturday 10:00h - 14:00h",
            "Freitag 18:00h - 20:00h & Samstag 10:00h - 14:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-leo.jpg"),
          name: "Leonard Luthe",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["", ""],
          i18nExpertise: [
            "Technology (Web-Development, Social Sciences)",
            "Technologie (Web-Entwicklung, Social Sciences)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 20:00h",
            "Freitag 18:00h - 20:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-jannik.jpg"),
          name: "Jannik Jung",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["objective partner AG", "objective partner AG"],
          i18nExpertise: [
            "Technology (Software/Backend/Mobile/Microcontroller-Development, Architecture, Deployments)",
            "Technologie (Software/Backend/Mobil/Mikrocontroller-Entwicklung, Architektur, Deployments)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 22:00h & Saturday 10:00h - 22:00h",
            "Freitag 18:00h - 22:00h & Samstag 10:00h - 22:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-conde.jpg"),
          name: "Pascal Conde",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["MVV Energy AG", "MVV Energie AG"],
          i18nExpertise: [
            "Technology (Contact person for the MVV-Challenge)",
            "Technologie (Ansprechpartner zur MVV-Challenge)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 20:00h & Saturday 10:00h - 14:00h",
            "Freitag 18:00h - 20:00h & Samstag 10:00h - 14:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-bauer.jpg"),
          name: "Julia Bauer",
          category: MENTOR_CATEGORY.EXPERT,
          i18nOrganisation: ["", ""],
          i18nExpertise: [
            "Sustainability (Human-centred Design, integrated Water Management, International Development, SDGs)",
            "Nachhaltigkeit (Menschenzentriertes Design, integriertes Wassermanagement, internationale Entwicklung, SDGs)"
          ],
          i18nAvailability: [
            "Friday 18:00h - 22:00h & Saturday 10:00h - 18:00h",
            "Freitag 18:00h - 22:00h & Samstag 10:00h - 18:00h"
          ]
        },

        // PITCH TRAINER
        {
          icon: require("../../assets/mentor/mentor-uwe.jpeg"),
          name: "Uwe Langohr",
          category: MENTOR_CATEGORY.PITCH_TRAINER,
          i18nOrganisation: ["4XP Ventures", "4XP Ventures"],
          i18nExpertise: ["Pitch Trainer", "Pitch Trainer"],
          i18nAvailability: [
            "Saturday 20:00h - 21:00h",
            "Samstag 20:00h - 21:00h"
          ]
        },
        {
          icon: require("../../assets/mentor/mentor-elena.png"),
          name: "Elena Langenfelder",
          category: MENTOR_CATEGORY.PITCH_TRAINER,
          i18nOrganisation: ["BASF SE", "BASF SE"],
          i18nExpertise: ["Pitch Trainer", "Pitch Trainerin"],
          i18nAvailability: [
            "Saturday 20:00h - 21:00h",
            "Samstag 20:00h - 21:00h"
          ]
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "speakersTitle": "Speakers",
    "introSpeakers": "Here we will publish speaker by speaker who will give you a goose bump moment at the opening ceremony on Friday. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a speaker.",
    "more": "More",
    "talkTitle": "title of the talk",
    "aboutTheSpeakerFemale": "About the speaker",
    "aboutTheSpeakerMale": "About the speaker",
    "aboutTheJudgeFemale": "About the jury member",
    "aboutTheJudgeMale": "About the jury member",
    "juryTitle": "Jury",
    "introJury": "Here we will publish really cool jury members, one after each other. And because science has not been given enough attention so far, we have at least two jury members from this category. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a jury member.",
    "mentorsTitle": "Mentors",
    "introMentors": "So that you have a contact person ready to answer questions on a wide variety of topics, we will put a battalion of mentors at your side. Find out more soon who you can expect here.",
    "button": {
      "close": "Close",
      "downloadMentoringFacts": "Mentoring Fact-Sheet",
      "registerAsMentor": "Register as Mentor"
    }
  },
  "de": {
    "speakersTitle": "Referenten",
    "introSpeakers": "Hier werden wir nach und nach die Referenten veröffentlichen, die dir bei der Eröffnung am Freitag einen Gänsehautmoment verpassen werden. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Redner zu bewerben.",
    "more": "More",
    "talkTitle": "Titel des Vortrags",
    "aboutTheSpeakerFemale": "Über die Speakerin",
    "aboutTheSpeakerMale": "Über den Speaker",
    "aboutTheJudgeFemale": "Über die Jurorin",
    "aboutTheJudgeMale": "Über den Juror",
    "juryTitle": "Jury",
    "introJury": "Hier werden wir Jurymitglieder veröffentlichen, eine*r nach der/m anderen. Und weil der Wissenschaft bisher nicht genügend Aufmerksamkeit geschenkt wurde, haben wir zwei Jurymitglieder aus dieser Kategorie. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Jury-Mitglied zu bewerben.",
    "mentorsTitle": "Mentoren",
    "introMentors": "Damit du immer einen Ansprechpartner hast, der dir bei Fragen zu den unterschiedlichsten Themen zur Seite steht, stellen wir dir ein Bataillon von Mentoren zur Seite. Mehr darüber, wen du hier erwarten kannst, erfährst du in Kürze.",
    "button": {
      "close": "Schliessen",
      "downloadMentoringFacts": "Mentoring Fact-Sheet",
      "registerAsMentor": "Als Mentor*in registrieren"
    }
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  padding-bottom 128px
  h2
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 28px
    letter-spacing 1.4px
    text-align center
    color #ffffff
    margin-top 128px
    margin-bottom 64px

  .icon-large
    margin 0 auto

  .introSpeakers, .introJury, .introMentors
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-align center
    color rgba(255, 255, 255, 0.8)

  .stack-grid-item
    transition all 300ms
    display flex
    flex-direction column
    align-items center
    justify-content center
    .avatar-image
      border-radius 8px
      border 1px solid transparent
      &.speaker
        border-color #a8e5a3
      &.judge
        border-color rgba(255,255,255,0.8)
      &.mentor
        border-color #ffc533
        &.expert
          border-color #70b4df
        &.pitchTrainer
          border-color #DD543B
    .speaker-name, .judge-title, .mentor-title
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      font-stretch normal
      line-height 1
      letter-spacing 1px
      text-align inherit
      color #ffffff
    .speaker-description, .judge-description, .mentor-description
      font-family click-clack,sans-serif
      font-weight 300
      font-size 20px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      color rgba(255, 255, 255, 0.8)
    .speaker-talk
      font-family click-clack,sans-serif
      font-weight 500
      font-size 20px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      &.speaker-talk
        color #A8E5A3
    .mentor-expertise
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 18px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      &.mentor-expertise
        color #ffc533
        &.expert
          color #70b4df
        &.pitchTrainer
          color #DD543B
    .mentor-availability
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 18px
      line-height 1.2
      letter-spacing normal
      text-align center
      color rgba(255, 255, 255, 0.8)

.v-dialog--fullscreen
  .card
    height auto
    .dialog-card-content
      flex-grow 1
    .dialog-card-footer
      flex-grow 0

.card
  height 100%
  h3
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 24px
    letter-spacing 1px
    color rgba(255, 255, 255, 0.8)
  h4
    font-family Roboto Condensed,sans-serif
    font-size 20px
    font-weight 600
    line-height 1.4
    letter-spacing 1.5px
    text-align center
    text-transform uppercase
    color #ffffff
  .avatar
    margin 0 auto
    border-radius 50%
  .annotation-text
    font-family click-clack,sans-serif
    font-weight 500
    font-size 20px
    font-style normal
    line-height 1.2
    letter-spacing 0.5px
    text-align inherit
    color #A8E5A3
    &.judge
      color #ffffff
  .description
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing 1px
    text-align center
    color rgba(255, 255, 255, 0.8)
  .long-description
    font-family Roboto Condensed,sans-serif
    font-size 20px
    line-height 1.4
    letter-spacing 1px
    text-align center
    color rgba(255, 255, 255, 0.8)
  .dialog-card-footer
    button
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      letter-spacing 1.5px
</style>
