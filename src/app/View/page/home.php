<?php
$colors = ['--st', '--pg']
?>
<div id="home" class="page p-home f-color_primary ">
    <div class="title f-family_primary z:1">
        <h1>
            <span id="one">PLANETE</span>
            <span id="two">GREEN</span>
        </h1>
    </div>
    <div class="japanese_title z:1">
        <h3>
            <span class="f-family_secondary f-48px sub">緑の惑星</span>
        </h3>
    </div>
    <ul class="ul-project_nav z:1">
        <?php for ($i = 0; $i < 2; $i++): ?>
            <li class="f-family_primary m--brain" data-color="<?= $colors[$i] ?>" ></li>
        <?php endfor; ?>
    </ul>
    <div class="fake z:1"></div>
    <ul class="ul-card z:1">
        <?php for ($i = 0; $i < 1; $i++): ?>
            <li>
                <a href="/">
                    <div class="c-img">
                        <img src="/media/home/img2.jpg" alt="A project">
                    </div>
                </a>
            </li>
        <?php endfor; ?>
    </ul>
    <div class="resume f-500 z:1">
        <p><span id="txt">Ecommerce for Planète Green</span></p>
        <p><span id="txt2">A shop that sells cbd products.</span></p>
    </div>
</div>

