package com.mirza.chat.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mirza.chat.model.User;
import com.mirza.chat.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    // private final PasswordEncoder passwordEncoder;

    // // Create an admin user at the beggining
    // @PostConstruct
    // public void init() {
    // User user = User.builder()
    // .username("mirza")
    // .password(passwordEncoder.encode("password"))
    // .authorities(new ArrayList<String>(Arrays.asList("ROLE_ADMIN", "ROLE_USER")))
    // .build();
    // userRepository.save(user);
    // }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        // Get user details
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Get user's authorities
        // List<SimpleGrantedAuthority> authorities = user.getAuthorities().stream()
        // .map(authority -> new
        // SimpleGrantedAuthority(authority)).collect(Collectors.toList());

        // Create new UserDetails
        // return JwtUserDetails.builder()
        // .id(user.getId())
        // .username(user.getUsername())
        // .password(user.getPassword())
        // .authorities(authorities)
        // .build();
        return user;
    }
}
