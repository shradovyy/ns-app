<template>
    <AbsoluteLayout width="100%" class="swipe-to-reveal-item" @loaded="setToStartDefault">
        
        <FlexboxLayout class="background">
          <slot name="background">
              <Button class="removeBtn" />
          </slot>
        </FlexboxLayout>

        <StackLayout @pan="onSwipeStarted" id="swipeToRevealItem" ref="swipeToRevealItem" class="front">
            <slot name="foreground" >
                <Label text="content" textWrap="true" />
            </slot>
        </StackLayout>

      </AbsoluteLayout>
</template>

<script>

export default {
    data() {
        return {
            x: 0,
            MIN_X: -150,
            MAX_X: 0,
            THRESHOLD: 0.5
        }
    },
    computed: {
        lastSwipeAt() {
            return this.$store.state.lastSwipeAt;
        }
    },
    methods: {
        setToStart(animate) {

            let view = this.$refs.swipeToRevealItem.nativeView;

            if(this.lastSwipeAt != view) {
                if(animate) {
                view.animate({
                        translate: { x: 0, y: 0 },
                        duration: 150
                    });
                } else {
                view.translateX = 0;
                }
                this.x = 0;
            } 

        },
        setToStartDefault() {
            let view = this.$refs.swipeToRevealItem.nativeView;
            view.translateX = 0;
            this.x = 0;
        },
        onSwipeStarted(args) {

        
            let foreground = args.object;

            // if(this.$store.state.lastSwipeAt != null && this.$store.state.lastSwipeAt.getViewById("swipeToRevealItem") != foreground) {
            //     this.$store.state.lastSwipeAt.getViewById("swipeToRevealItem").animate({
            //         translate: { x: 0, y: 0 },
            //         duration: 150
            //     });
            // }

            // this.$store.state.lastSwipeAt = foreground;

            this.$store.commit('setComponent', foreground);
            


            if(args.state === 1) {
                this.x = foreground.translateX;
            }

            let newX = this.x + args.deltaX;

            if (newX >= this.MIN_X && newX <= this.MAX_X) {
                foreground.translateX = newX;
            }

            if (args.state === 3 && !(newX === this.MIN_X || newX === this.MAX_X)) {

                let destX = 0;

                if (newX <= this.MIN_X * this.THRESHOLD) {
                    destX = this.MIN_X;
                } else if (newX >= this.MAX_X * this.THRESHOLD) {
                    destX = this.MAX_X;
                }

                foreground.animate({
                    translate: { x: destX, y: 0 },
                    duration: 150
                });

            }

        }
    },
    watch: {
        lastSwipeAt(oldValue, newValue) {
            this.setToStart(true);
        }
    }
}
</script>

<style scoped>

    .swipe-to-reveal-item {
        width: 100%;
    }

    .swipe-to-reveal-item .front {
        width: 100%;
    }

    .background {
        width: 100%;
        justify-content: flex-end;
    }

    .removeBtn {
        background-color: rgb(241, 23, 23);
        background-image: url('~/images/delete.png');
        background-size: 20 20;
        background-position: center;
        background-repeat: no-repeat;
        color: #fff;
        width: 150;
        border-radius: 0;
    }
</style>
