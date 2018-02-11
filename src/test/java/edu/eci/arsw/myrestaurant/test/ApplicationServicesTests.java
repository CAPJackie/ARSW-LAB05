package edu.eci.arsw.myrestaurant.test;

import edu.eci.arsw.myrestaurant.beans.BillCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.logging.Level;
import java.util.logging.Logger;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.fail;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;



/**
 * Test design:
 * 
 * Equivalence classes:
 *  
 *      EC1: Description. The number of the table doesn´t exist
 *           Expected result: OrderServicesException.
 *          
 *      EC2: Description. The number of the table exists
 *           Expected result: The total bill should be correct.
 * 
 **/

@RunWith(SpringRunner.class)
@SpringBootTest()
public class ApplicationServicesTests {

    @Autowired
    RestaurantOrderServices ros;

    
    @Test
    public void ItShouldNotCalculateTheTotalBillIfTheTableDoesNotExist() throws OrderServicesException{
        try{
            int totalBill = ros.calculateTableBill(4);
            fail("The test has fail");
        } catch(OrderServicesException e){
            assertEquals("Mesa inexistente o ya liberada:" + 4, e.getMessage());
        }
    }
    
    @Test
    public void ItShouldCalculateCorrectlyTheTotalBillIfTheTableExists() throws OrderServicesException{
        assertEquals(ros.calculateTableBill(1), 45302);
        assertEquals(ros.calculateTableBill(3), 32290);
    }
    
    

}
