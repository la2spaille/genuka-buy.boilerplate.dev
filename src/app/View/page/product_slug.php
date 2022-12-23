<div id="product_slug" class="page p-product f-color_primary ">
    <section>
        <div class="l-rl">
            <div class="l-tb">
                <div class="w-product_slug">
                    <div class="w-gallery product_slug">
                        <div class="c-img product_slug primary">
                            <img src="<?= $this->data->medias[0]['link'] ?>"
                                 class="product_image"
                                 style="z-index: 1;position: relative"
                                 alt="">
                            <?php foreach ($this->data->medias as $i => $media): ?>
                                <?php if ($i != 0) : ?>
                                    <img class="_img product_image"
                                         style="z-index: -1"
                                         src="<?= $media['link'] ?>"
                                         alt="">
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                        <?php if (count($this->data->medias) > 1): ?>
                            <div class="c-gallery">
                                <div class="c-img">
                                    <img class="_g" style="opacity: 0.5"
                                         src="<?= $this->data->medias[0]['link'] ?>"
                                         alt="">
                                </div>
                                <?php foreach ($this->data->medias as $i => $media): ?>
                                    <?php if ($i != 0) : ?>
                                        <div class="c-img">
                                            <img class="_g"
                                                 src="<?= $media['link'] ?>"
                                                 alt="">
                                        </div>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="w-text product_info">
                        <h2>
                            <strong>DESCRIPTION</strong>
                        </h2>
                        <?= $this->data->description ?>

                    </div>

                </div>
            </div>
        </div>
    </section>
</div>

