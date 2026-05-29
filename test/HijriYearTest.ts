import {suite, test} from '@testdeck/mocha';
import {HijriYear} from '../lib';
import {equal} from 'assert';

@suite
class HijriYearTest {
    @test
    test() {
        equal(HijriYear.fromYear(1).isLeap(), false);
        equal(HijriYear.fromYear(2).isLeap(), true);
        equal(HijriYear.fromYear(0).isLeap(), false);
        equal(HijriYear.fromYear(-1).isLeap(), true);
    }
}
