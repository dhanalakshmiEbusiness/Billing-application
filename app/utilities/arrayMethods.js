/**
 * Created by zendynamix on 2/13/2016.
 */
module.exports={
        addDays:Date.prototype.addDays = function(days) {
                var dat = new Date(this.valueOf())
                dat.setDate(dat.getDate() + days);
                return dat;
        }
}