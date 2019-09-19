<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <v-card
        v-for="(item, i) in faqs"
        :key="i"
        class="faq-card pa-3 mb-4"
        :color="
          item.greenBatch ? 'rgba(76,174,121,0.1)' : 'rgba(255,255,255,0.1)'
        "
        ripple
        flat
        @click="toogleTile(i)"
      >
        <h3
          :style="{ color: item.greenBatch ? '#A8E5A3' : null }"
          class="faq-title my-1 mx-3"
        >
          {{ $i18n.locale === "en" ? item.i18nTitle[0] : item.i18nTitle[1] }}
        </h3>
        <v-expand-transition>
          <p
            v-if="item.show"
            :style="{ color: item.greenBatch ? '#A8E5A3' : null }"
            class="faq-text my-1 mx-3 mt-4"
            v-html="$i18n.locale === 'en' ? item.i18nText[0] : item.i18nText[1]"
          ></p>
        </v-expand-transition>
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "FAQ",
  props: {
    themeColor: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  },
  methods: {
    toogleTile(i) {
      const clickedFaq = this.faqs[i];
      const prevShow = this.faqs[i].show;

      this.faqs.forEach(c => (c.show = false));
      clickedFaq.show = !prevShow;
    }
  },
  data() {
    return {
      faqs: [
        {
          show: false,
          i18nTitle: [
            "What can I do to minimize my footprint during the event?",
            "Was kann ich tun, um meinen ökologischen Fussabdruck während der Veranstaltung zu minimieren?"
          ],
          i18nText: [
            "Use train, public transportation or bicycle. Check out <a class='link' target='_blank' href='https://modellstadt.de'>Mannheim Green CIty Tickets</a>. Avoid plain, cap or car, use car sharing potentials if you are forced to use a car, e.g. <a  class='link' target='_blank' href='https://www.blablacar.de'>BlaBlaCar</a>. And take a look at CO2 offset pages such as <a class='link' target='_blank' href='https://www.atmosfair.de/de/'>atmosfair</a>, <a class='link' target='_blank' href='https://www.myclimate.org/de/'>myclimate</a>, <a class='link' target='_blank' href='https://www.climatepartner.com/de'>ClimatePartner</a> and <a class='link' target='_blank' href='https://klima-kollekte.de'>Klimakollekte</a>. We hope to provide more detailed information soon on how to keep your ecological footprint as small as possible.",
            "Benutze Zug, öffentliche Verkehrsmittel oder Fahrrad. Sehe dir auch <a class='link' target='_blank' href='https://modellstadt.de'>Mannheim Green CIty Tickets</a> an. Vermeide Flugzeug, Taxi oder Auto, nutze Carsharing-Potenziale, wenn du gezwungen bist, ein Auto zu benutzen, z.B. <a class='link' target='_blank' href='https://www.blablacar.de'>BlaBlaCar</a>. Und werfen Sie einen Blick auf CO2-Offsetseiten wie <a class='link' target='_blank' href='https://www.atmosfair.de/de/'>atmosfair</a>, <a class='link' target='_blank' href='https://www.atmosfair.de/de/org/de/'>myclimate</a>, <a class='link' target='_blank' href='https://www.climatepartner.com/de'>ClimatePartner</a> und <a class='link' target='_blank' href='https://klima-kollekte.de'>Klimakollekte</a>. Wir hoffen, dir bald nähere Informationen darüber geben zu können, wie du deinen ökologischen Fußabdruck so klein wie möglich halten kannst."
          ],
          greenBatch: true
        },
        {
          show: false,
          i18nTitle: [
            "What we did to make this event sustainable?",
            "Was haben wir getan, um diese Veranstaltung nachhaltig zu gestalten?"
          ],
          i18nText: [
            "We strive to organize a climate-neutral hackathon. We have received amazing support and information material from the Mannheim Climate Protection Agency, with whom we are confident to implement many new ideas and concepts. We primarily follow three important principles with regard to our CO2 event balance: 1. avoidance, 2. reduction, 3. compensation. We are still in the middle of planning and want to share our challenges and experiences with you in the next months via blog posts. Keep your fingers crossed that we will reach our goal.",
            "Wir sind bestrebt, einen klimaneutralen Hackathon zu organisieren. Von der Mannheimer Klimaschutzbehörde, mit der wir zuversichtlich sind, viele neue Ideen und Konzepte umzusetzen, haben wir erstaunliches Unterstützungs- und Informationsmaterial erhalten. Für unsere CO2-Ereignisbilanz folgen wir im Wesentlichen drei wichtigen Prinzipien: 1. Vermeidung, 2. Reduzierung, 3. Kompensation. Wir sind noch mitten in der Planung und wollen unsere Herausforderungen und Erfahrungen in den nächsten Monaten über Blog-Posts mit dir teilen. Drück die Daumen, damit wir unser Ziel erreichen."
          ],
          greenBatch: true
        },
        {
          show: false,
          i18nTitle: ["What is a hackathon?", "Was ist ein Hackathon?"],
          i18nText: [
            "A hackathon is any event of any duration where people come together to solve problems with digital means and present them to each other. That’s it, really simple. In most cases a hackathon is on two days and you get 24-48 hours time for the hacking. In our case 40 (+1; thanks to the time change, we get one hour for free) hours. Hacking is meant in the sense of exploratory programming, not referenced to any computer crime.",
            "Ein Hackathon ist eine Veranstaltung beliebiger Dauer, bei der Menschen zusammenkommen, um Probleme mit digitalen Mitteln zu lösen und diese gegenseitig zu präsentieren. Das ist es, ganz einfach. In den meisten Fällen ist ein Hackathon an zwei Tagen und du hast 24-48 Stunden Zeit für das Hacking. In unserem Fall 40 (+1; dank der Zeitumstellung bekommen wir eine Stunde gratis) Stunden. Hacking ist im Sinne von explorativer Programmierung gemeint bzw. wird als kreativer Umgang mit Technologie verstanden, ohne Bezugnahme auf Computerkriminalität."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: [
            "Do I need to pay for the tickets?",
            "Muss ich die Tickets bezahlen?"
          ],
          i18nText: [
            "No. But: You pay 10€ for the tickets in our ticket shop, but you get 10€ refund in cash when you show up at the event. Want to cancel your registration? Then please <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>contact us</a>, at the moment we don't know yet if we can refund ticket prices.",
            "Nein. Aber: Du bezahlst 10€ für die Tickets in unserem Ticketshop, aber du erhältst 10€ Rückerstattung in Bar, wenn du auf dem Event auftauchst. Du möchtest deine Registrierung stornieren? Dann wende dich bitte <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>an uns</a>, zum aktuellen Zeitpunkt wissen wir noch nicht ob wir Ticketpreise erstatten können."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: [
            "What is the event language?",
            "Was ist die Eventsprache?"
          ],
          i18nText: [
            "The event language is German. This means the talks (unless otherwise marked) and the moderation are in German. However, we welcome all nationalities, languages and dialects. If you have any questions or don't understand something, the whole organizing team will be happy to help you in English. You also have the freedom to decide if you want to pitch in English or German.",
            "Die Eventsprache ist Deutsch. Das bedeutet die Vorträge (soweit nicht anders gekennzeichnet) und die Moderation sind auf Deutsch. Wir heißen jedoch alle Nationalitäten, Sprachen und Dialekte willkommen. Wenn ihr Fragen habt oder etwas nicht verstanden habt, hilft euch das gesamte Orga-Team auf Englisch gerne weiter. Darüber hinaus habt ihr auch die Freiheit zu entscheiden ob ihr auf Englisch oder Deutsch pitchen wollt."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: ["What should I bring?", "Was soll ich mitbringen?"],
          i18nText: [
            "Tricky question. Grab everything you need for work. Most likely your mobile phone, charger, laptop, charger and some good headphones. Don't forget your toothpaste, towel (especially for the Saturday morning yoga workshop), deodorant etc. and extra clothes. Optionally, you can pack a sleeping mat and sports gear for the yoga workout. If you also want to sleep, don't forget a pillow and a sleeping bag.  We will have free drinks and food on site, so don't worry. You will also get free internet access. There will also be a shower on site.",
            "Knifflige Frage. Schnapp dir alles, was du zur Arbeit brauchst. Höchstwahrscheinlich dein Handy, Ladegerät, dein Laptop, Ladegerät und ein paar gute Kopfhörer. Vergesse nicht deine Zahnpasta, Handtuch (insbesondere für den Yoga Workshop am Samstag Vormittag), Deodorant etc. und zusätzliche Kleidung. Optional kannst du für den Yoga Workout eine Isomatte und Sportklamotten einpacken. Wenn du auch mal schlafen möchtest, vergesse nicht ein Kissen und einen Schlafsack. Wir werden Getränke und Essen kostenlos vor Ort haben, hier also keine Sorge. Außerdem erhältst du einen kostenlosen Internetzugang. Eine Dusche gibt es übrigens auch vor Ort."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: [
            "What if I've never been to a hackathon or don't have any experience?",
            "Was, wenn ich noch nie bei einem Hackathon war oder keine Erfahrungen mitbringe?"
          ],
          i18nText: [
            "Don’t worry. The Climathon is specifically designed to accommodate beginners as well as people with more experience. If you've never been to a hackathon or just started programming, or don't think you have any skills at all: Don't panic!  Ask yourself the following question: Is our planet close to your heart? If you can answer the question with YES, you have already fulfilled all requirements as a participant. There will be a safe environment with many mentors who can support you every step of the way, more contacts and the organization team in person who will always be at your side when you need them.",
            "Mach dir keine Sorgen. Der Climathon wurde speziell für Anfänger und Fortgeschrittene entwickelt. Wenn du noch nie bei einem Hackathon warst oder gerade erst mit dem Programmieren angefangen hast oder glaubst gar keine Fähigkeiten mitzubringen: Keine Panik! Stell dir folgende Frage: Liegt dir unser Planet am herzen? Wenn du die Frage mit JA beantworten kannst, hast du alle Voraussetzungen als Teilnehmer bereits erfüllt. Es wird eine sichere Umgebung geben mit vielen Mentoren die dich bei jeden Schritt unterstützen können, weiteren Ansprechpartnern und das Organisationsteam höchstpersönlich was dir immer zur Seite steht wenn Bedarf besteht."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: [
            "How much time do we have to finish our idea?",
            "Wie viel Zeit haben wir, um unsere Idee fertigzustellen?"
          ],
          i18nText: [
            "The Hackathon will start Friday evening and ends Sunday in the morning. Until then the location will be opened and accessible for all participants around the clock. In our case you will have 40 (+1; thanks to the time change, we get one hour for free) hours.",
            "Der Hackathon beginnt am Freitagabend und endet am Sonntag morgen. Bis dahin ist die Location geöffnet und für alle Teilnehmer rund um die Uhr zugänglich. In unserem Fall hast du 40 Stunden (+1; dank der Zeitumstellung bekommen wir eine Stunde gratis)."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: ["How big are the teams?", "Wie groß sind die Teams?"],
          i18nText: [
            "Hackathons are more fun when you work with others, so we encourage people to form teams beforehand or find teams at the event. We will allow team of the size of 3 to 7 People.",
            "Hackathons machen mehr Spaß, wenn du mit anderen zusammenarbeitest, deshalb ermutigen wir die Leute, vorher Teams zu bilden oder Teams auf der Veranstaltung zu finden. Wir werden Teams von 3 bis 7 Personen zulassen."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: ["Where can I sleep?", "Wo kann ich schlafen?"],
          i18nText: [
            "We will have some areas where you can nap for a couple of hours. However, if you plan to have a relaxing good nights sleep, you should book a Bed in a Hostel. Do you travel from far away? You will have to stay at a hostel or AirBnB or friend over night. We are currently looking for partnerships with nearby hotels, if something is happening here, you will hear about it directly.",
            "Wir werden einige Bereiche haben, in denen du für ein paar Stunden schlafen kannst. Wenn du jedoch eine erholsame Nacht verbringen möchtest, solltest du ein Bett in einem Hotel buchen. Reist du von weit her an? Dann musst du über Nacht in einem Hotel, AirBnB oder bei einem Freund übernachten. Wir sind auf der Suche nach Partnerschaften mit nahegelegenen Hotels, wenn hier etwas passiert, wirst du direkt davon erfahren."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: [
            "Are there travel cost reimbursements?",
            "Gibt es Reisekostenerstattungen?"
          ],
          i18nText: [
            "If we have enough budget, we will be able to give travel cost reimbursements. If we reach this status, we will inform you.",
            "Wenn wir über genügend Budget verfügen, können wir Reisekostenerstattungen leisten. Wenn wir diesen Status erreichen, werden wir dich informieren."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: [
            "Will there be food and drinks?",
            "Wird es Essen und Trinken geben?"
          ],
          i18nText: [
            "You will definitely not starve at this event – and of course it will be free for all participants. And the pizza - spaghetti - burger thing... nope. Be prepared!",
            "Du wirst bei diesem Event definitiv nicht verhungern - und natürlich ist es für alle Teilnehmer kostenlos. Und die Pizza - Spaghetti - Burger-Sache.... nein. Seid vorbereitet und wartet ab!"
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: ["Who is Hackerstolz?", "Wer ist Hackerstolz?"],
          i18nText: [
            "An organization to rule them all, no just kidding. We are a non-profit association that wants to contribute to an active IT community in Germany, support digital culture and promote the integration of more women and other minorities into IT. In the last 4 years we have organized several hackathons on topics such as education, food and mobility as well as the first German refugee hackathon. In addition to the hackathon, we also organize female tech conferences and programming workshops called Hackschool.",
            "Wir sind ein gemeinnütziger Verein, der zu einer aktiven IT-Community in Deutschland beitragen, die digitale Kultur unterstützen und die Integration von mehr Frauen und anderen Minderheiten in der IT fördern will. In den letzten 4 Jahren haben wir mehrere Hackathons zu Themen wie Bildung, Ernährung und Mobilität sowie den ersten deutschen Geflüchteten-Hackathon organisiert. Zusätzlich zu Hackathons organisieren wir auch Tech-Konferenzen für Frauen und Programmier-Workshops namens Hackschool."
          ],
          greenBatch: false
        },
        {
          show: false,
          i18nTitle: ["Are there any rules?", "Gibt es irgendwelche Regeln?"],
          i18nText: [
            // TODO: update rules
            "Yes, there is. We are currently working on our final version of the rules. We are not reinventing the wheel #copycat either. Pick and choose from one of the following Hackathon rules, our version will eventually have 99% overlap with them: <a href='https://mobility-hacks.devpost.com/rules' class='link' target='_blank'>Mobility Hacks Rules</a>,  <a href='http://berlincodeofconduct.org ' class='link' target='_blank'>Berlin Code of Conduct</a> or <a href='http://www.beforeitstoolate.earth/hackathon.html' class='link' target='_blank'>Before it's to late rules</a>",
            "Ja, das gibt es. Wir arbeiten derzeit an unserer endgültigen Version der Regeln. Wir erfinden aber das Rad #copycat nicht neu. Wählt eine der folgenden Hackathon-Regeln aus, unsere Version wird sich letztendlich zu 99% mit ihnen überschneiden: <a href='https://mobility-hacks.devpost.com/rules' class='link' target='_blank'>Mobility Hacks Rules</a>, <a href='http://berlincodeofconduct.org ' class='link' target='_blank'>Berlin Code of Conduct</a> oder <a href='http://www.beforeitstoolate.earth/hackathon.html' class='link' target='_blank'>Bevor es zu späten Regeln kommt</a>"
          ],
          greenBatch: false
        }
        // TODO: add prize and judging criterias etc.
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "FAQ"
  },
  "de": {
    "title": "FAQ"
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

  .faq-card
    cursor pointer
    .faq-title
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-size 20px
      line-height 1.4
      letter-spacing normal
      text-align left
      color rgba(255, 255, 255, 0.8)
    .faq-text
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing normal
      text-align left
      color rgba(255, 255, 255, 0.8)
</style>
