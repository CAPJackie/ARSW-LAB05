/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.eci.arsw.myrestaurant.restcontrollers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.model.ProductType;
import edu.eci.arsw.myrestaurant.model.RestaurantProduct;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;
//import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@Service
@RestController
@RequestMapping(value = "/orders/{idtable}")
public class OrdersAPIController {
    @Autowired
    RestaurantOrderServices ros;
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getOrder(@PathVariable String idtable){
            try {
                    Set<Integer> keys = ros.getTablesWithOrders();
                    Map<Integer, String> mapa = new HashMap<Integer, String>();
                    
                    int id = Integer.parseInt(idtable);
                    
                    mapa.put(id, ros.getTableOrder(id).toString());
                    /*for(Integer i: keys){
                        mapa.put(i, ros.getTableOrder(i).toString());
                    }*/

                    String json = new ObjectMapper().writeValueAsString(mapa);
                
                return new ResponseEntity<>(json,HttpStatus.ACCEPTED);
            } catch (JsonProcessingException ex) {
                    Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
                    return new ResponseEntity<>("Error, page not found",HttpStatus.NOT_FOUND);
            }  
    }      
}
