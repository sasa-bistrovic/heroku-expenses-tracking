package com.by.sasa.bistrovic.expense.tracking;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {
    
    @GetMapping("/")
    public void serveIndex(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String host = request.getHeader("Host");
        String url = request.getRequestURL().toString();
        HttpSession session = request.getSession();
        Boolean hasRedirected1 = (Boolean) session.getAttribute("hasRedirected1");
        Boolean hasRedirected2 = (Boolean) session.getAttribute("hasRedirected2");
        Boolean hasRedirected3 = (Boolean) session.getAttribute("hasRedirected3");        
        Boolean hasRedirected4 = (Boolean) session.getAttribute("hasRedirected4");        
        Boolean hasRedirected5 = (Boolean) session.getAttribute("hasRedirected5");        
        Boolean hasRedirected6 = (Boolean) session.getAttribute("hasRedirected6");        
        Boolean hasRedirected7 = (Boolean) session.getAttribute("hasRedirected7");        
        Boolean hasRedirected8 = (Boolean) session.getAttribute("hasRedirected8");        
        Boolean hasRedirected9 = (Boolean) session.getAttribute("hasRedirected9");        
        Boolean hasRedirected10 = (Boolean) session.getAttribute("hasRedirected10");        
        Boolean hasRedirected11 = (Boolean) session.getAttribute("hasRedirected11");        
        //Boolean hasRedirected12 = (Boolean) session.getAttribute("hasRedirected12");
        Boolean hasDispatcher = (Boolean) session.getAttribute("hasDispatcher");

        if (hasRedirected1 == null || !hasRedirected1) {
            if (url != null && !url.contains("https://www.expense-tracking.com")) {
            session.setAttribute("hasRedirected11", true);
            //session.setAttribute("hasRedirected12", true);
            hasRedirected11 = true;        
            }
            if (url != null && url.contains("https://www.expense-tracking.com")) {
            session.setAttribute("hasRedirected11", false);
            //session.setAttribute("hasRedirected12", true);
            hasRedirected11 = false;        
            }            
            if (url == null) {
            session.setAttribute("hasRedirected11", false);
            //session.setAttribute("hasRedirected12", true);
            hasRedirected11 = false;            
            }
        }

        if (hasRedirected1 == null || !hasRedirected1) {
            if (url != null && url.contains("https://www.expense-tracking.com")) {
            if (hasRedirected11 == null || !hasRedirected11) {
             try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
            }
      }
        }

        if (hasRedirected11 != null || hasRedirected11==true) {

        if (hasRedirected1 == null || !hasRedirected1) {
            session.setAttribute("hasDispatcher", false);
            //session.setAttribute("hasRedirected12", true);
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected1", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected1", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected1", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }            
            
        } else if (hasRedirected2 == null || !hasRedirected2) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected2", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected2", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected2", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected3 == null || !hasRedirected3) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected3", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected3", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected3", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected4 == null || !hasRedirected4) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected4", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected4", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected4", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected5 == null || !hasRedirected5) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected5", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected5", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected5", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected6 == null || !hasRedirected6) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected6", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected6", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected6", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected7 == null || !hasRedirected7) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected7", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected7", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected7", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected8 == null || !hasRedirected8) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected8", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected8", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected8", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected9 == null || !hasRedirected9) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected9", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected9", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected9", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasRedirected10 == null || !hasRedirected10) {
            //System.out.println("Yess1");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasRedirected10", true);
               response.sendRedirect("http://localhost:8080");
            }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasRedirected10", true);
               response.sendRedirect("https://spring-boot-react-postgresql-871fccdeec8d.herokuapp.com");
            }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasRedirected10", true);
               response.sendRedirect("https://www.expense-tracking.com");
            }              
            
        } else if (hasDispatcher == null || !hasDispatcher) {
            //System.out.println("Yess2");
           if (host != null && host.contains("localhost") || url != null && url.contains("localhost")) {
               session.setAttribute("hasDispatcher", true);
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
           }   
           if (host != null && host.contains("herokuapp") || url != null && url.contains("herokuapp")) {
               session.setAttribute("hasDispatcher", true);
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
           }   
           if (host != null && host.contains("expense-tracking.com") || url != null && url.contains("expense-tracking.com")) {
               session.setAttribute("hasDispatcher", true);
               
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
            
        }
        
        session.setAttribute("hasRedirected1", false);
        session.setAttribute("hasRedirected2", false);
        session.setAttribute("hasRedirected3", false);
        session.setAttribute("hasRedirected4", false);
        session.setAttribute("hasRedirected5", false);
        session.setAttribute("hasRedirected6", false);
        session.setAttribute("hasRedirected7", false);
        session.setAttribute("hasRedirected8", false);
        session.setAttribute("hasRedirected9", false);
        session.setAttribute("hasRedirected10", false);
        session.setAttribute("hasRedirected11", false);
    
       }
        }
    }
    
    @GetMapping("/Registering")
    public void getRoot1(HttpServletRequest request, HttpServletResponse response) throws IOException {
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
    }
    
    @GetMapping("/SetNewPassword")
    public void getRoot2(HttpServletRequest request, HttpServletResponse response) throws IOException {
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
    }
    
    
    @GetMapping("/VerifyingEmail")
    public void getRoot3(HttpServletRequest request, HttpServletResponse response) throws IOException {
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
    }
    
    @GetMapping("/RequestPasswordReset")
    public void getRoot4(HttpServletRequest request, HttpServletResponse response) throws IOException {
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
    }
    
    @GetMapping("/ResendVerificationEmail")
    public void getRoot5(HttpServletRequest request, HttpServletResponse response) throws IOException {
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
    }
    
    @GetMapping("/Home")
    public void getRoot6(HttpServletRequest request, HttpServletResponse response) throws IOException {
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
    }    

    @GetMapping("/ExpenseTrackingPay")
    public void getRoot7(HttpServletRequest request, HttpServletResponse response) throws IOException {
            try {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
                dispatcher.forward(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Resource not found");
            }
    }
    
}
