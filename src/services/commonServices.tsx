class CommonService {

    asyncLoop(iterations: number, func: Function, callback?: Function) {
        var index = 0;
        var done = false;
        var loop = {
            next: function () {
                if(done) {
                    return;
                }
                if(index < iterations) {
                    index++;
                    func(loop);
                } else {
                    done = true;
                    if(callback) {
                        callback("finish");
                    }
                }
            },
            iteration: function () {
                return index - 1;
            },
            break: function () {
                done = true;
                if(callback) {
                    callback("break");
                }
            }
        };
        loop.next();
        return loop;
    }
}
const commonService = new CommonService();
export default commonService;