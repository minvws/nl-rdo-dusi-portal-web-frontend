<template>
  <section>
    <div>
      <h1>Toegankelijkheidsverklaring Mijn DUS-I</h1>
      <p>
        DUS-I wil zo snel mogelijk volledig voldoen aan de toegankelijkheidseisen van
        DigiToegankelijk.nl op niveau AA. Voldoen aan deze standaard maakt onze website onder andere
        gebruiksvriendelijker en beter toegankelijk voor verschillende doelgroepen.
      </p>
      <h3>Aanpak om de toegankelijkheid van onze website te bevorderen</h3>
      <p>
        Wij hebben de volgende maatregelen genomen om naleving van de toegankelijkheidseisen te
        bevorderen:
      </p>
      <ul>
        <li>
          <strong>Audits</strong>: Wij laten onze processen om webcontent te creëren regelmatig
          auditeren om vast te stellen of deze optimaal zijn ingericht om naleving van de
          toegankelijkheidseisen te bevorderen.
        </li>
        <li>
          <strong>Automatische toetsen</strong>: Wij laten onze website regelmatig toetsen door een
          automatische toetstool.
        </li>
        <li>
          <strong>Interne controle vóór publicatie</strong>: Onze redactie toetst vóór publicatie
          alle content op toegankelijkheid.
        </li>
        <li>
          <strong>Periodieke interne controle</strong>: Onze redactie voert periodiek tussentijdse
          controles uit op de content.
        </li>
        <li>
          <strong>Training werknemers</strong>: Onze redacteuren hebben een training over
          toegankelijkheid gevolgd.
        </li>
      </ul>
      <h3>Extra toelichting</h3>
      <p>
        De website is gemaakt binnen het Platform Rijksoverheid. De content wordt door twee
        getrainde, interne redacteuren gemaakt en geplaatst. Omdat vanuit het platform aan de
        technische voorwaarden wordt voldaan ligt de focus op B1-leesniveau, de toegankelijkheid van
        documenten en eventuele andere content als video en infographics.
      </p>
      <h3>Probleem met de toegankelijkheid van deze website?</h3>
      <p>
        Als u ondanks de maatregelen die wij al hebben genomen een toegankelijkheidsprobleem ervaart
        op onze website, laat het ons dan weten.
        <a
          href="https://www.dus-i.nl/contact"
          aria-label="Bekijk onze contactgegevens (opent externe website)"
          >Bekijk onze contactgegevens</a
        >.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.not-found.title')}`
})
</script>
