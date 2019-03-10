class Sprite {
    constructor(app) {
        this.app = app;
        this.get_input_start_x = this.get_input_start_x;
        this.get_input_end_x = this.get_input_end_x;
        this.get_output_start_x = this.get_output_start_x;
        this.get_output_end_x = this.get_output_end_x;
        this.get_vertical_mid = this.get_vertical_mid;
        this.get_x_rand = this.get_x_rand;
        this.get_y_rand = this.get_y_rand;
        this.set_x_rand = this.set_x_rand;

    }

    get_input_start_x() {
        return -108;
    }

    get_input_end_x() {
        const divide_width = this.app.getWidth() / 5;
        return divide_width * 2;
    }

    get_output_start_x() {
        const divide_width = this.app.getWidth() / 5;
        return (divide_width * 3) - 20;
    }

    get_output_end_x() {
        return this.app.getWidth();
    }

    get_vertical_mid() {
        return (this.app.getHeight() * 0.5) - (22 * 0.5);//기본값 수직중앙
    }

    get_x_rand() {
        const start_x = this.get_input_end_x();
        const end_x = this.get_output_start_x();
        const width = end_x - start_x;
        const rand_width = Math.floor(Math.random() * width);

        return start_x + rand_width;
    }

    get_y_rand() {
        const v_mid = this.get_vertical_mid() - 50;
        const add_y = Math.floor(Math.random() * 100);

        return v_mid + add_y;
    }

    get_target_x() {
        return this.get_x_rand();
    }
}

export default Sprite;