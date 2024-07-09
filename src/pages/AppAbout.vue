<script>
export default {
    name: 'AppAbout'
}
</script>

<template>
    <div class="container">
        <div class="d-flex row">
            <div class="ms-route-list col-lg-2">
                <ul>
                    <li><a href="#our-story">La Nostra Storia</a></li>
                    <li><a href="#our-mission">La Nostra Missione</a></li>
                    <li><a href="#our-team">Il Nostro Team</a></li>
                    <li><a href="#our-value">I Nostri Valori</a></li>
                    <li><a href="#why-us">Perché Sceglierci</a></li>
                </ul>
            </div>
            <div class="col-lg-10">
                <h1 class="my-3 ms-color-primary">Chi Siamo</h1>
                <h3 id="our-story">La Nostra Storia</h3>
                <p>Benvenuti a <strong>Deliveboo</strong>, il servizio di ordinazione e consegna pasti che sta
                    rivoluzionando il
                    modo di gustare il cibo a Roma. La nostra avventura è iniziata nel 2024, quando un gruppo di
                    studenti
                    appassionati della Boolean ha deciso di unire le loro competenze tecnologiche e il loro amore per la
                    buona
                    cucina. La nostra missione è semplice: rendere ogni pasto un'esperienza indimenticabile,
                    direttamente a
                    casa
                    vostra.</p>
                <h3 id="our-mission">La Nostra Missione</h3>
                <p>La nostra missione è portare la felicità sulla vostra tavola con piatti deliziosi e di alta qualità,
                    pronti
                    per essere gustati in pochi click. Vogliamo rendere ogni pasto un momento speciale, che sia un
                    pranzo
                    veloce
                    durante una giornata intensa o una cena rilassante dopo una lunga giornata.
                    <strong>Deliveboo</strong> è
                    qui per
                    semplificare
                    la vostra vita, offrendovi una vasta gamma di opzioni culinarie, tutte preparate con ingredienti
                    freschi
                    e
                    consegnate direttamente a casa vostra.</p>
                <h3 id="our-team">Il Nostro Team</h3>
                <p>Dietro <strong>Deliveboo</strong> c'è un team di giovani professionisti, appassionati di tecnologia e
                    gastronomia.
                    Proveniamo
                    da Boolean, un ambiente che ci ha insegnato a innovare e a pensare fuori dagli schemi. Ogni giorno,
                    lavoriamo con dedizione per offrire un servizio impeccabile e piatti che soddisfino ogni palato. La
                    nostra
                    squadra è composta da esperti di cucina, sviluppatori di software e specialisti del servizio
                    clienti,
                    tutti
                    uniti dall'obiettivo comune di migliorare la vostra esperienza culinaria.</p>
                <h3 id="our-value">I Nostri Valori</h3>
                <ul>
                    <li>Qualità: Selezioniamo solo i migliori ingredienti per garantire che ogni piatto sia
                        un'esperienza
                        culinaria superiore.</li>
                    <li>Innovazione: Utilizziamo le più recenti tecnologie per rendere l'ordinazione e la consegna dei
                        pasti
                        un
                        processo semplice e veloce.</li>
                    <li>Freschezza: Ogni ordine viene preparato al momento, garantendo che ogni pasto sia fresco e
                        delizioso.
                    </li>
                    <li>Comodità: Offriamo un'interfaccia utente intuitiva e un servizio di consegna rapido, rendendo
                        facile
                        ordinare i vostri piatti preferiti.</li>
                    <li>Sostenibilità: Siamo impegnati a ridurre l'impatto ambientale scegliendo packaging
                        eco-compatibile e
                        ingredienti locali e biologici.</li>
                </ul>
                <h3 id="why-us">Perché Sceglierci</h3>
                <p>Scegliere <strong>Deliveboo</strong> significa affidarsi a una realtà giovane e dinamica, che mette
                    il
                    cliente al centro
                    di
                    tutto. Ogni piatto che prepariamo è pensato per deliziarvi e offrirvi un momento di puro piacere.
                    Che si
                    tratti di una cena romantica, di un pranzo di lavoro o di una serata tra amici, siamo qui per
                    rendere
                    ogni
                    occasione speciale con i nostri piatti saporiti e genuini.

                    Unitevi a noi in questo viaggio di sapori e scoprite come <strong>Deliveboo</strong> può trasformare
                    ogni pasto in
                    un'esperienza indimenticabile.</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/generic';
@use '../style/partials/variables' as *;

.ms-color-primary {
    color: $primary-color;
}

h3 {
    color: $primary-color;
}

ul {
    list-style-type: none;

    a {
        color: #000;

        &.hover {
            color: $primary-color;
        }
    }
}

li {
    padding-top: 12px;
    text-decoration: none;

    &.hover {
        color: $primary-color;
    }
}
@media screen and (max-width: 1920px) {
      .ms-route-list{
        display: flex;
      }
}

@media screen and (max-width: 768px) {
      .ms-route-list{
        display: none;
      }
}
</style>