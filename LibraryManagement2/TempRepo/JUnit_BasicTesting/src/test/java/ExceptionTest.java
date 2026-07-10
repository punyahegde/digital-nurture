import org.junit.Test;

import static org.junit.Assert.assertThrows;

public class ExceptionTest {

    @Test
    public void testException() {

        assertThrows(ArithmeticException.class, () -> {
            int result = 10 / 0;
        });

    }
}